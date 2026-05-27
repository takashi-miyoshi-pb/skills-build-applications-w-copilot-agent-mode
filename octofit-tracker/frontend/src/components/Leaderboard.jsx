import { useEffect, useState } from 'react';

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
const apiBaseUrl = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const normalize = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload?.data) return payload.data;
  if (payload?.items) return payload.items;
  if (payload?.results) return payload.results;
  return [];
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBaseUrl}/leaderboard/`)
      .then((res) => res.json())
      .then((json) => setEntries(normalize(json)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      <p className="notice">API: {apiBaseUrl}/leaderboard/</p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {entries.map((entry) => (
            <li key={entry._id || entry.id}>
              <strong>{entry.rank}</strong>. {entry.userId?.username || entry.userId} —{' '}
              {entry.points} points
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Leaderboard;
