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

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBaseUrl}/activities/`)
      .then((res) => res.json())
      .then((json) => setActivities(normalize(json)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      <p className="notice">API: {apiBaseUrl}/activities/</p>
      {loading && <p>Loading activities...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id || activity.id}>
              <strong>{activity.type}</strong> — {activity.duration} min{' '}
              {activity.distance ? `(${activity.distance} km)` : ''}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Activities;
