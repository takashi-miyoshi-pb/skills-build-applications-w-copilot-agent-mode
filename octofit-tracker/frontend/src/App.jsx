import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Users from './components/Users.jsx';
import Teams from './components/Teams.jsx';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Workouts from './components/Workouts.jsx';

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
const apiBaseUrl = `${apiHost}/api`;

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <h1>Octofit Tracker</h1>
        <p className="subtitle">
          API base: <code>{apiBaseUrl}</code>
        </p>
        <p className="notice">
          {CODESPACE_NAME
            ? 'Codespaces API URL is configured.'
            : 'VITE_CODESPACE_NAME is not set; using localhost fallback.'}
        </p>
        <nav className="main-nav">
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
