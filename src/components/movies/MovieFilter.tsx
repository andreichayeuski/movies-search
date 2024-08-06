import React, { useEffect, useState } from 'react';
import { MovieFilterModel } from '../../models/MovieFilterModel';

interface MovieFilterProps {
  onFilterChange: (filter: MovieFilterModel) => void;
}

const MovieFilter: React.FC<MovieFilterProps> = ({ onFilterChange }) => {
  const [watched, setWatched] = useState<'all' | 'watched' | 'unwatched'>('all');

  useEffect(() => {
    onFilterChange({ watched });
  }, [watched]);

  return (
    <div className="mb-4 p-4 border">
      <h3 className="text-xl mb-2">Filter Movies</h3>
      <div className="mb-2">
        <select
          value={watched}
          onChange={(e) => setWatched(e.target.value as 'all' | 'watched' | 'unwatched')}
          className="p-2 border w-full"
        >
          <option value="all">All Movies</option>
          <option value="watched">Watched Only</option>
          <option value="unwatched">Unwatched Only</option>
        </select>
      </div>
    </div>
  );
};

export default MovieFilter;
