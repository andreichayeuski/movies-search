import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import MovieCard from './MovieCard';
import MovieFilter from './MovieFilter';
import { MovieFilterModel } from '../../models/MovieFilterModel';

const MovieList: React.FC = () => {
  const favoriteMovies = useSelector((state: RootState) => state.favorites.movies);
  const [filter, setFilter] = useState<MovieFilterModel>({
    watched: 'all'
  });

  const filteredMovies = favoriteMovies.filter((movie) => {
    const matchesWatched = filter.watched === 'all' ||
      (filter.watched === 'watched' && movie.watched) ||
      (filter.watched === 'unwatched' && !movie.watched);

    return matchesWatched;
  });

  const handleFilterChange = (newFilter: MovieFilterModel) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <MovieFilter onFilterChange={handleFilterChange} />
      <div className="p-4">
        <h2 className="text-2xl mb-4">My Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No movies found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
