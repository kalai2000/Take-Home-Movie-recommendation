import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, test, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import ActorProfile from './ActorProfile';
import * as api from '../api';

vi.mock('../api');

const mockActor = {
  name: 'Tom Hanks',
  age: 65,
  movies: ['Forrest Gump', 'Cast Away'],
};

describe('ActorProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (actorName = 'Tom Hanks') => {
    return render(
      <MemoryRouter initialEntries={[`/actor/${actorName}`]}>
        <Routes>
          <Route path="/actor/:name" element={<ActorProfile />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('displays loading state initially', async () => {
    // Delay mock to allow loading state to show
    api.fetchActorProfile.mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve(mockActor), 50))
    );

    renderWithRouter();

    expect(screen.getByText((content) => content.includes('Loading'))).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Age:/)).toBeInTheDocument());
  });

  test('displays actor profile after fetch', async () => {
    api.fetchActorProfile.mockResolvedValue(mockActor);
    renderWithRouter();

    expect(await screen.findByText('Tom Hanks')).toBeInTheDocument();
    expect(screen.getByText(/Age:/)).toBeInTheDocument();
    expect(screen.getByText('Forrest Gump')).toBeInTheDocument();
    expect(screen.getByText('Cast Away')).toBeInTheDocument();
  });

  test('displays error message on fetch failure', async () => {
    api.fetchActorProfile.mockRejectedValue(new Error('API failed'));
    renderWithRouter();

    expect(await screen.findByText(/Error: Failed to fetch actor data/i)).toBeInTheDocument();
  });

  test('displays no actor found when data is null', async () => {
    api.fetchActorProfile.mockResolvedValue(null);
    renderWithRouter();

    expect(await screen.findByText(/No actor found/i)).toBeInTheDocument();
  });
});