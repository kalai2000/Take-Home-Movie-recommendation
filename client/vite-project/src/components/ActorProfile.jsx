import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchActorProfile } from '../api';

function ActorProfile() {
  const { name } = useParams();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadActorData() {
      try {
        const data = await fetchActorProfile(name);
        setActor(data);
      } catch (err) {
        console.error('Actor fetch error:', err);
        setError('Failed to fetch actor data');
      } finally {
        setLoading(false);
      }
    }

    loadActorData();
  }, [name]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Loading {name}'s profile…
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-600 font-semibold text-center">Error: {error}</div>;
  }

  if (!actor) {
    return <div className="p-6 text-center text-gray-400">No actor found with name {name}.</div>;
  }

  const { age, movies = [] } = actor;

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">{actor.name}</h1>
      <p className="text-lg text-gray-700 mb-3">🗓️ Age: <span className="font-medium">{age}</span></p>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">🎬 Movies</h2>
      {movies.length === 0 ? (
        <p className="text-gray-500">No movies found.</p>
      ) : (
        <ul className="space-y-2">
          {movies.map((title, idx) => (
            <li key={idx} className="transition hover:scale-[1.02]">
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md inline-block shadow-sm">
                {title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ActorProfile;