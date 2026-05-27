import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  points: number;
  rank: number;
  totalActivities: number;
  totalDuration: number;
  updatedAt: Date;
}

const LeaderboardSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 0 },
    totalActivities: { type: Number, required: true, default: 0 },
    totalDuration: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
