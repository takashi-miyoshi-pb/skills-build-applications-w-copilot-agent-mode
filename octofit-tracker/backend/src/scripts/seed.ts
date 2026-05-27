import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

/**
 * Seed the octofit_db database with test data
 */

const MONGO_URI = 'mongodb://localhost:27017/octofit_db';

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing collections...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✅ Collections cleared');

    // Create users
    console.log('Creating users...');
    const users = await User.insertMany([
      {
        username: 'alice',
        email: 'alice@example.com',
        password: 'hashed_password_1',
        firstName: 'Alice',
        lastName: 'Johnson',
        profilePicture: 'https://example.com/alice.jpg',
      },
      {
        username: 'bob',
        email: 'bob@example.com',
        password: 'hashed_password_2',
        firstName: 'Bob',
        lastName: 'Smith',
        profilePicture: 'https://example.com/bob.jpg',
      },
      {
        username: 'charlie',
        email: 'charlie@example.com',
        password: 'hashed_password_3',
        firstName: 'Charlie',
        lastName: 'Brown',
        profilePicture: 'https://example.com/charlie.jpg',
      },
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Create teams
    console.log('Creating teams...');
    const teams = await Team.insertMany([
      {
        name: 'Fitness Warriors',
        description: 'A team dedicated to fitness and wellness',
        leaderId: users[0]._id,
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Marathon Runners',
        description: 'Team focused on long-distance running',
        leaderId: users[2]._id,
        members: [users[2]._id],
      },
    ]);
    console.log(`✅ Created ${teams.length} teams`);

    // Create activities
    console.log('Creating activities...');
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Running',
        duration: 45,
        calories: 450,
        distance: 5.2,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[0]._id,
        type: 'Cycling',
        duration: 60,
        calories: 600,
        distance: 15,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[1]._id,
        type: 'Swimming',
        duration: 30,
        calories: 300,
        distance: 1.5,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[2]._id,
        type: 'Running',
        duration: 90,
        calories: 900,
        distance: 10.5,
        date: new Date(),
      },
    ]);
    console.log(`✅ Created ${activities.length} activities`);

    // Create leaderboard entries
    console.log('Creating leaderboard entries...');
    const leaderboard = await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        totalCalories: 1050,
        totalDuration: 105,
        totalDistance: 20.7,
        rank: 1,
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        totalCalories: 300,
        totalDuration: 30,
        totalDistance: 1.5,
        rank: 2,
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        totalCalories: 900,
        totalDuration: 90,
        totalDistance: 10.5,
        rank: 1,
      },
    ]);
    console.log(`✅ Created ${leaderboard.length} leaderboard entries`);

    // Create workouts
    console.log('Creating workouts...');
    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        name: 'Upper Body Strength',
        description: 'Focus on chest, back, and arms',
        exercises: [
          { name: 'Bench Press', sets: 3, reps: 8 },
          { name: 'Barbell Rows', sets: 3, reps: 8 },
          { name: 'Dumbbell Curls', sets: 3, reps: 10 },
        ],
        difficulty: 'medium',
        estimatedDuration: 60,
      },
      {
        userId: users[1]._id,
        name: 'Cardio Blast',
        description: 'High-intensity interval training',
        exercises: [
          { name: 'Burpees', sets: 3, reps: 15 },
          { name: 'Mountain Climbers', sets: 3, reps: 20 },
          { name: 'Jump Squats', sets: 3, reps: 15 },
        ],
        difficulty: 'hard',
        estimatedDuration: 30,
      },
      {
        userId: users[2]._id,
        name: 'Beginner Yoga',
        description: 'Gentle stretching and flexibility',
        exercises: [
          { name: 'Child Pose', sets: 1, reps: 1 },
          { name: 'Downward Dog', sets: 1, reps: 1 },
          { name: 'Warrior Pose', sets: 2, reps: 1 },
        ],
        difficulty: 'easy',
        estimatedDuration: 45,
      },
    ]);
    console.log(`✅ Created ${workouts.length} workouts`);

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
