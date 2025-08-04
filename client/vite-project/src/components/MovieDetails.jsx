import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieById } from '../api';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieById(id)
      .then(setMovie)
      .catch((err) => {
        console.error('Error fetching movie:', err);
      });
  }, [id]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-lg">
        Loading movie details...
      </div>
    );
  }

  const {
    title,
    release_year,
    director,
    director_id,
    genres,
    actors,
  } = movie;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-4xl font-extrabold text-gray-900">{title || 'Untitled Movie'}</h2>

      <div className="text-lg text-gray-700">
        <p><span className="font-semibold">Year:</span> {release_year || '—'}</p>

        <p>
          <span className="font-semibold">Director:</span>{' '}
          {director && director_id ? (
            <a href={`/directors/${director_id}`} className="text-blue-600 hover:underline">
              {director}
            </a>
          ) : (
            director || '—'
          )}
        </p>

        <p>
          <span className="font-semibold">Genres:</span>{' '}
          {Array.isArray(genres) && genres.length > 0 ? genres.join(', ') : '—'}
        </p>

        <p>
          <span className="font-semibold">Cast:</span>{' '}
          {Array.isArray(actors) && actors.length > 0 ? (
            <div className="mt-2 space-x-3">
              {actors.map((actor) => (
                <a
                  key={actor}
                  href={`/actors/${actor}`}
                  className="inline-block text-blue-600 hover:underline"
                >
                  {actor}
                </a>
              ))}
            </div>
          ) : (
            '—'
          )}
        </p>
      </div>
    </div>
  );
}

export default MovieDetails;