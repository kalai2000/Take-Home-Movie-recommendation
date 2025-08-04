const BASE_URL = import.meta.env.VITE_BASE_URL; // From .env

export const fetchMovies = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      params.append(key, value);
    }
  });

  const res = await fetch(`${BASE_URL}/movies/?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch movies');
  return await res.json();
};

export const fetchMovieById = async (id) => {
  const res = await fetch(`${BASE_URL}/movies/${id}`);
  if (!res.ok) throw new Error(`Movie with ID ${id} not found`);
  return await res.json();
};

export const fetchActorProfile = async (name) => {
  const res = await fetch(`${BASE_URL}/actors/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error(`Actor ${name} not found`);
  return await res.json();
};

export const fetchDirectorProfile = async (name) => {
  const res = await fetch(`${BASE_URL}/directors/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error(`Director ${name} not found`);
  return await res.json();
};