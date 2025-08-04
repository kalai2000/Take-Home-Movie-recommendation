import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, test, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import DirectorDetail from './DirectorDetail';
import * as api from '../api';

vi.mock('../api');

const mockDirector = {
  name: 'Christopher Nolan',
  birth_year: 1970,
  movies: ['Inception', 'Interstellar', 'Dunkirk'],
};

describe('DirectorDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (name = 'Christopher Nolan') => {
    return render(
      <MemoryRouter initialEntries={[`/director/${name}`]}>
        <Routes>
          <Route path="/director/:name" element={<DirectorDetail />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('displays loading state initially', async () => {
    api.fetchDirectorProfile.mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve(mockDirector), 50))
    );

    renderWithRouter();

    expect(screen.getByText(/Loading director details/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Born:/)).toBeInTheDocument());
  });

  test('shows director details after successful fetch', async () => {
    api.fetchDirectorProfile.mockResolvedValue(mockDirector);
    renderWithRouter();

    expect(await screen.findByText('Christopher Nolan')).toBeInTheDocument();
    expect(screen.getByText(/Born:/)).toBeInTheDocument();
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
    expect(screen.getByText('Dunkirk')).toBeInTheDocument();
  });

  test('renders error message on fetch failure', async () => {
    api.fetchDirectorProfile.mockRejectedValue(new Error('Fetch failed'));
    renderWithRouter();

    expect(await screen.findByText(/Director not found/i)).toBeInTheDocument();
  });

  test('renders fallback when director is null', async () => {
    api.fetchDirectorProfile.mockResolvedValue(null);
    renderWithRouter();

    expect(await screen.findByText(/Director not found/i)).toBeInTheDocument();
  });
});