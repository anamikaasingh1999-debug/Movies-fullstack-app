import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { QueryMovieDto } from './dto/query-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
  ) {}

  // Create a new movie
  async create(createMovieDto: CreateMovieDto, userId: string): Promise<MovieDocument> {
    const newMovie = new this.movieModel({
      ...createMovieDto,
      userId,
    });
    return newMovie.save(); // ✅ works because newMovie is a Mongoose document
  }

  // Get all movies with pagination, search, and sorting
  async findAll(queryDto: QueryMovieDto, userId: string) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = queryDto;

    const query: any = { userId };

    if (search) {
      query.$or = [{ title: { $regex: search, $options: 'i' } }];
    }

    const skip = (page - 1) * limit;

    const sort: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
    };

    const [movies, total] = await Promise.all([
      this.movieModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.movieModel.countDocuments(query).exec(),
    ]);

    return {
      data: movies,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Find a movie by ID and check ownership
  async findOne(id: string, userId: string): Promise<MovieDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid movie ID: ${id}`);
    }

    const movie = await this.movieModel.findById(id).exec();

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    if (movie.userId.toString() !== userId) {
      throw new ForbiddenException('You do not have permission to access this movie');
    }

    return movie; // ✅ MovieDocument type allows save() & deleteOne()
  }

  // Update a movie
  async update(id: string, updateMovieDto: UpdateMovieDto, userId: string): Promise<MovieDocument> {
    const movie = await this.findOne(id, userId);

    Object.assign(movie, updateMovieDto); // merge updates
    return movie.save(); // ✅ works because movie is a Mongoose document
  }

  // Delete a movie
  async remove(id: string, userId: string): Promise<void> {
    const movie = await this.findOne(id, userId);
    await movie.deleteOne(); // ✅ works because movie is a Mongoose document
  }
}
