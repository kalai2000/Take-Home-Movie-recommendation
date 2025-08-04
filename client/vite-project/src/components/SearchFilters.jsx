import { useState } from 'react';

function SearchFilters({ filters, onFilter, onSearch }) {
  const [genre, setGenre] = useState(filters.genre || '');
  const [year, setYear] = useState(filters.year || '');
  const [actors, setActors] = useState(filters.actors || ''); 
  const [director, setDirector] = useState(filters.director || '');

  const applyFilters = () => {
    onFilter({ genre, year, actors, director });
    onSearch();
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center">
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="px-4 py-2 rounded border border-gray-300"
      />
      <input
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="px-4 py-2 rounded border border-gray-300"
      />
      <input
        type="text"
        placeholder="Actors"
        value={actors}
        onChange={(e) => setActors(e.target.value)}
        className="px-4 py-2 rounded border border-gray-300"
      />
      <input
        type="text"
        placeholder="Director"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
        className="px-4 py-2 rounded border border-gray-300"
      />
      <button
        onClick={applyFilters}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}

export default SearchFilters;