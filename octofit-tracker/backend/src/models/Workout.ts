import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  userId: Types.ObjectId;
  name: string;
  description: string;
  exercises: {
    name: string;
    sets: number;
    reps: number;
  }[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedDuration: number;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
      },
    ],
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    estimatedDuration: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
