import { useState, useEffect } from 'react'
import { fetchMovies } from '../api'
import SearchFilters from './SearchFilters'
import MovieCard from './MovieCard'

function Home() {
  const [movies, setMovies] = useState([])
  const [filters, setFilters] = useState({})

  const handleSearch = async () => {
    try {
      const data = await fetchMovies(filters)
      setMovies(data)
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  useEffect(() => {
    const loadAllMovies = async () => {
      try {
        const data = await fetchMovies({})
        setMovies(data)
      } catch (error) {
        console.error('Error fetching all movies:', error)
      }
    }

    loadAllMovies()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">🎥 Movie Explorer</h1>
      </header>

      <SearchFilters filters={filters} onFilter={setFilters} onSearch={handleSearch} />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No movies found</p>
        )}
      </section>
    </div>
  )
}

export default Home