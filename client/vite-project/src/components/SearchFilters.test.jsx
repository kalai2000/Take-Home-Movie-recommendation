import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchFilters from './SearchFilters';
import '@testing-library/jest-dom';

describe('SearchFilters', () => {
  test('renders all input fields and button', () => {
    render(
      <SearchFilters
        filters={{}}
        onFilter={vi.fn()}
        onSearch={vi.fn()}
      />
    );

    expect(screen.getByPlaceholderText('Genre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Year')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Actors')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Director')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('updates state and calls props on Search click', () => {
    const handleFilter = vi.fn();
    const handleSearch = vi.fn();

    render(
      <SearchFilters
        filters={{}}
        onFilter={handleFilter}
        onSearch={handleSearch}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Genre'), {
      target: { value: 'Drama' },
    });
    fireEvent.change(screen.getByPlaceholderText('Year'), {
      target: { value: '2023' },
    });
    fireEvent.change(screen.getByPlaceholderText('Actors'), {
      target: { value: 'Vijay Sethupathi' },
    });
    fireEvent.change(screen.getByPlaceholderText('Director'), {
      target: { value: 'Lokesh Kanagaraj' },
    });

    fireEvent.click(screen.getByText('Search'));

    expect(handleFilter).toHaveBeenCalledWith({
      genre: 'Drama',
      year: '2023',
      actors: 'Vijay Sethupathi',
      director: 'Lokesh Kanagaraj',
    });

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  test('initial values come from filters prop', () => {
    const initialFilters = {
      genre: 'Thriller',
      year: '2018',
      actors: 'Fahadh Faasil',
      director: 'Jeethu Joseph',
    };

    render(
      <SearchFilters
        filters={initialFilters}
        onFilter={vi.fn()}
        onSearch={vi.fn()}
      />
    );

    expect(screen.getByPlaceholderText('Genre')).toHaveValue('Thriller');
    expect(screen.getByPlaceholderText('Year')).toHaveValue('2018');
    expect(screen.getByPlaceholderText('Actors')).toHaveValue('Fahadh Faasil');
    expect(screen.getByPlaceholderText('Director')).toHaveValue('Jeethu Joseph');
  });
});