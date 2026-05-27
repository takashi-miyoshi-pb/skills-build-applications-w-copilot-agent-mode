import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';
import { MONGO_URI } from '../config/database';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB:', MONGO_URI);

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('Database cleared');

    // Create users
    console.log('Creating users...');
    const users = await User.create([
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'hashed_password_1',
        firstName: 'John',
        lastName: 'Doe',
        bio: 'Fitness enthusiast',
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'hashed_password_2',
        firstName: 'Jane',
        lastName: 'Smith',
        bio: 'Marathon runner',
      },
      {
        username: 'mike_johnson',
        email: 'mike@example.com',
        password: 'hashed_password_3',
        firstName: 'Mike',
        lastName: 'Johnson',
        bio: 'Gym rat',
      },
      {
        username: 'sarah_williams',
        email: 'sarah@example.com',
        password: 'hashed_password_4',
        firstName: 'Sarah',
        lastName: 'Williams',
        bio: 'Cyclist',
      },
    ]);
    console.log(`Created ${users.length} users`);

    // Create teams
    console.log('Creating teams...');
    const teams = await Team.create([
      {
        name: 'Team Alpha',
        description: 'Elite fitness group',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Team Beta',
        description: 'Casual runners',
        leader: users[2]._id,
        members: [users[2]._id, users[3]._id],
      },
    ]);
    console.log(`Created ${teams.length} teams`);

    // Create activities
    console.log('Creating activities...');
    const activities = await Activity.create([
      {
        userId: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 7.5,
        calories: 600,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Morning run at the park',
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        duration: 60,
        distance: 25,
        calories: 800,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Trail cycling',
      },
      {
        userId: users[2]._id,
        type: 'gym',
        duration: 90,
        calories: 700,
        date: new Date(),
        notes: 'Upper body workout',
      },
      {
        userId: users[3]._id,
        type: 'swimming',
        duration: 50,
        distance: 2,
        calories: 500,
        date: new Date(),
        notes: 'Pool session',
      },
    ]);
    console.log(`Created ${activities.length} activities`);

    // Create leaderboard entries
    console.log('Creating leaderboard entries...');
    const leaderboard = await Leaderboard.create([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        points: 1200,
        rank: 1,
        totalActivities: 25,
        totalDuration: 1500,
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        points: 1100,
        rank: 2,
        totalActivities: 22,
        totalDuration: 1400,
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        points: 950,
        rank: 3,
        totalActivities: 20,
        totalDuration: 1200,
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        points: 850,
        rank: 4,
        totalActivities: 18,
        totalDuration: 1000,
      },
    ]);
    console.log(`Created ${leaderboard.length} leaderboard entries`);

    // Create workouts
    console.log('Creating workouts...');
    const workouts = await Workout.create([
      {
        name: 'Full Body Strength',
        description: 'Complete full body workout',
        duration: 60,
        difficulty: 'intermediate',
        exercises: [
          { name: 'Bench Press', sets: 3, reps: 8 },
          { name: 'Squats', sets: 3, reps: 8 },
          { name: 'Deadlifts', sets: 3, reps: 5 },
        ],
      },
      {
        name: 'Cardio Blast',
        description: 'High intensity cardio',
        duration: 30,
        difficulty: 'advanced',
        exercises: [
          { name: 'Running', sets: 1, reps: 30 },
          { name: 'Jump rope', sets: 5, reps: 30 },
        ],
      },
      {
        name: 'Beginner Yoga',
        description: 'Gentle yoga for beginners',
        duration: 45,
        difficulty: 'beginner',
        exercises: [
          { name: 'Sun Salutation', sets: 5, reps: 1 },
          { name: 'Downward Dog', sets: 10, reps: 1 },
        ],
      },
    ]);
    console.log(`Created ${workouts.length} workouts`);

    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
