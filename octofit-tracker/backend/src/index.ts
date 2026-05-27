import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';
const CODESPACE_NAME = process.env.CODESPACE_NAME;

// Construct API URL with Codespaces support
const getApiUrl = (): string => {
  if (CODESPACE_NAME) {
    return `https://${CODESPACE_NAME}-8000.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

app.use(express.json());

// Health check
app.get('/', (_req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'octofit-backend',
    apiUrl: getApiUrl()
  });
});

// Users routes
app.get('/api/users/', (_req, res) => {
  res.json({ message: 'List all users' });
});

app.post('/api/users/', (_req, res) => {
  res.json({ message: 'Create new user' });
});

app.get('/api/users/:id', (_req, res) => {
  res.json({ message: `Get user ${_req.params.id}` });
});

app.put('/api/users/:id', (_req, res) => {
  res.json({ message: `Update user ${_req.params.id}` });
});

app.delete('/api/users/:id', (_req, res) => {
  res.json({ message: `Delete user ${_req.params.id}` });
});

// Teams routes
app.get('/api/teams/', (_req, res) => {
  res.json({ message: 'List all teams' });
});

app.post('/api/teams/', (_req, res) => {
  res.json({ message: 'Create new team' });
});

app.get('/api/teams/:id', (_req, res) => {
  res.json({ message: `Get team ${_req.params.id}` });
});

app.put('/api/teams/:id', (_req, res) => {
  res.json({ message: `Update team ${_req.params.id}` });
});

app.delete('/api/teams/:id', (_req, res) => {
  res.json({ message: `Delete team ${_req.params.id}` });
});

// Activities routes
app.get('/api/activities/', (_req, res) => {
  res.json({ message: 'List all activities' });
});

app.post('/api/activities/', (_req, res) => {
  res.json({ message: 'Create new activity' });
});

app.get('/api/activities/:id', (_req, res) => {
  res.json({ message: `Get activity ${_req.params.id}` });
});

app.put('/api/activities/:id', (_req, res) => {
  res.json({ message: `Update activity ${_req.params.id}` });
});

app.delete('/api/activities/:id', (_req, res) => {
  res.json({ message: `Delete activity ${_req.params.id}` });
});

// Leaderboard routes
app.get('/api/leaderboard/', (_req, res) => {
  res.json({ message: 'Get leaderboard' });
});

app.get('/api/leaderboard/:teamId', (_req, res) => {
  res.json({ message: `Get leaderboard for team ${_req.params.teamId}` });
});

// Workouts routes
app.get('/api/workouts/', (_req, res) => {
  res.json({ message: 'List all workouts' });
});

app.post('/api/workouts/', (_req, res) => {
  res.json({ message: 'Create new workout' });
});

app.get('/api/workouts/:id', (_req, res) => {
  res.json({ message: `Get workout ${_req.params.id}` });
});

app.put('/api/workouts/:id', (_req, res) => {
  res.json({ message: `Update workout ${_req.params.id}` });
});

app.delete('/api/workouts/:id', (_req, res) => {
  res.json({ message: `Delete workout ${_req.params.id}` });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB:', MONGO_URI);
    const apiUrl = getApiUrl();
    app.listen(PORT, () => {
      console.log(`Backend listening on ${apiUrl}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
