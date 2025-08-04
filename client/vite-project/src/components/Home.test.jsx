import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, test, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import Home from './Home';
import * as api from '../api';
import * as SearchFilters from './SearchFilters';
import { MemoryRouter } from 'react-router-dom';

//  Mock external modules
vi.mock('../api');
vi.mock('./SearchFilters', () => ({
  default: vi.fn(() => <div data-testid="search-filters" />),
}));

const mockMovies = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan' },
  { id: 2, title: 'Parasite', director: 'Bong Joon-ho' },
];

//  Utility to render with router context
const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders header and search filters', async () => {
    api.fetchMovies.mockResolvedValue(mockMovies);

    renderWithRouter(<Home />);
    expect(screen.getByText(/Movie Explorer/i)).toBeInTheDocument();
    expect(screen.getByTestId('search-filters')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Inception')).toBeInTheDocument();
      expect(screen.getByText('Parasite')).toBeInTheDocument();
    });
  });

  test('shows "No movies found" when empty list is returned', async () => {
    api.fetchMovies.mockResolvedValue([]);

    renderWithRouter(<Home />);
    await waitFor(() => {
      expect(screen.getByText(/No movies found/i)).toBeInTheDocument();
    });
  });

  test('triggers search when handleSearch is invoked via props', async () => {
    const filters = { genre: 'Sci-Fi' };
    api.fetchMovies.mockResolvedValue([mockMovies[0]]);

    SearchFilters.default.mockImplementation(({ onSearch }) => (
      <div>
        <button onClick={onSearch} data-testid="search-button">
          Search
        </button>
      </div>
    ));

    renderWithRouter(<Home />);
    fireEvent.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(screen.getByText('Inception')).toBeInTheDocument();
    });
  });

  test('logs error if fetch fails on initial load', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    api.fetchMovies.mockRejectedValue(new Error('Network error'));

    renderWithRouter(<Home />);
    await waitFor(() => {
      expect(screen.getByText(/No movies found/i)).toBeInTheDocument();
    });

    expect(spy).toHaveBeenCalledWith(
      'Error fetching all movies:',
      expect.any(Error)
    );
    spy.mockRestore();
  });
});