import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema({ timestamps: true })
export class Movie {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, min: 1800, max: 2100 })
  publishingYear: number;

  @Prop({ required: true })
  poster: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

// Indexes for better query performance
MovieSchema.index({ userId: 1, createdAt: -1 });
MovieSchema.index({ title: 'text' });