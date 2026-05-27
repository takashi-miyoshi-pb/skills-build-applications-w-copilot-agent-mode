import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: Types.ObjectId;
  teamId: Types.ObjectId;
  totalCalories: number;
  totalDuration: number;
  totalDistance: number;
  rank: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    totalCalories: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 },
    totalDistance: { type: Number, default: 0 },
    rank: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
