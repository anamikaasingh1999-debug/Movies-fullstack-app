import { IsNotEmpty, IsString, IsNumber, Min, Max, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMovieDto {
  @ApiProperty({
    example: 'The Shawshank Redemption',
    description: 'Movie title',
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    example: 1994,
    description: 'Year the movie was published',
    minimum: 1800,
    maximum: 2100,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Publishing year must be a number' })
  @IsNotEmpty({ message: 'Publishing year is required' })
  @Min(1800, { message: 'Publishing year must be at least 1800' })
  @Max(2100, { message: 'Publishing year cannot exceed 2100' })
  publishingYear: number;

  @ApiProperty({
    example: 'https://example.com/poster.jpg',
    description: 'URL to the movie poster image',
  })
  @IsString({ message: 'Poster must be a string' })
  @IsNotEmpty({ message: 'Poster is required' })
  poster: string;
}