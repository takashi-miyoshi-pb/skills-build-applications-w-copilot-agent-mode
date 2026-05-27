import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
