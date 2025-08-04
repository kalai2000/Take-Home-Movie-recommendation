import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchDirectorProfile } from '../api';

function DirectorDetail() {
  const { name } = useParams();
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchDirectorProfile(name)
      .then((data) => setDirector(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Loading director details...
      </div>
    );
  }

  if (error || !director) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Director not found.
      </div>
    );
  }

  const { name: directorName, birth_year, movies = [] } = director;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 space-y-4">
      <h2 className="text-4xl font-extrabold text-indigo-700">{directorName}</h2>
      <p className="text-lg text-gray-700">
        🗓️ Born: <span className="font-medium">{birth_year || 'Unknown'}</span>
      </p>

      <h3 className="text-xl font-semibold text-gray-800 pt-4">🎬 Movies:</h3>
      {movies.length === 0 ? (
        <p className="text-gray-500">No movies recorded.</p>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {movies.map((title, idx) => (
            <li key={`movie-${idx}`} className="text-blue-600">{title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DirectorDetail;