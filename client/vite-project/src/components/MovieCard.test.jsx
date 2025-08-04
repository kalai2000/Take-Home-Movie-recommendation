import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieCard from './MovieCard';
import '@testing-library/jest-dom';

const mockMovie = {
  id: 42,
  title: 'Interstellar',
  release_year: 2014,
  genres: ['Sci-Fi', 'Adventure'],
  director: 'Christopher Nolan',
  actors: ['Matthew McConaughey', 'Anne Hathaway'],
};

describe('MovieCard', () => {
  test('renders movie details correctly', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    // Basic info
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
    expect(screen.getByText('Released: 2014')).toBeInTheDocument();
    expect(screen.getByText('Genres: Sci-Fi, Adventure')).toBeInTheDocument();

    // Director link
    const directorLink = screen.getByText('Christopher Nolan');
    expect(directorLink).toBeInTheDocument();
    expect(directorLink.closest('a')).toHaveAttribute(
      'href',
      '/directors/Christopher Nolan'
    );

    // Actor links
    expect(screen.getByText('Matthew McConaughey')).toBeInTheDocument();
    expect(screen.getByText('Anne Hathaway')).toBeInTheDocument();

    // View Details
    const viewDetailsBtn = screen.getByText('View Details');
    expect(viewDetailsBtn).toBeInTheDocument();
    expect(viewDetailsBtn.closest('a')).toHaveAttribute('href', '/movies/42');
  });

  test('renders fallback genres and cast when missing', () => {
    const incompleteMovie = {
      id: 12,
      title: 'Unknown',
      release_year: 2000,
      genres: null,
      director: 'Anonymous',
      actors: [],
    };

    render(
      <MemoryRouter>
        <MovieCard movie={incompleteMovie} />
      </MemoryRouter>
    );

    expect(screen.getByText('Genres: —')).toBeInTheDocument();
    expect(screen.getByText('Cast: —')).toBeInTheDocument();
  });
});