import { Link } from 'react-router-dom'

function MovieCard({ movie }) {
  return (
    <div className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition duration-200">
      <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>

      <p className="text-gray-600">Released: {movie.release_year}</p>

      <p className="text-gray-600">Genres: {Array.isArray(movie.genres) ? movie.genres.join(', ') : '—'}</p>

      <p className="text-gray-600 mt-2">
        Director:{' '}
        <Link to={`/directors/${movie.director}`} className="text-blue-500 hover:underline">
          {movie.director}
        </Link>
      </p>

      <p className="text-gray-600 mt-2">
        Cast:{' '}
        {Array.isArray(movie.actors) && movie.actors.length > 0 ? (
          movie.actors.map((actor) => (
            <Link key={actor} to={`/actors/${actor}`} className="text-blue-500 hover:underline mr-2">
              {actor}
            </Link>
          ))
        ) : (
          '—'
        )}
      </p>

      <Link
        to={`/movies/${movie.id}`}
        className="inline-block mt-4 text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  )
}

export default MovieCard