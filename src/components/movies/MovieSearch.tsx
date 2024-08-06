import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchMoviesQuery } from '../../services/movieApi';
import { addFavorite, removeFavorite } from '../../slices/favoritesSlice';
import { Movie } from '../../models/Movie';
import { RootState } from '../../store/store';
import { getGenreNames } from '../../utils/genreUtils';
import { Link } from 'react-router-dom';

const MovieSearch: React.FC = () => {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [releaseYear, setReleaseYear] = useState('');

  const genres = useSelector((state: RootState) => state.genre.genres);
  const favorites = useSelector((state: RootState) => state.favorites.movies);

  const movieGenres = (movie: Movie) => {
    return getGenreNames(genres.filter(g => movie.genre_ids.includes(g.id)));
  };

  const { data, error, isLoading, refetch } = useSearchMoviesQuery({ title, director, releaseYear });
  const dispatch = useDispatch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const handleToggleFavorite = (movie: Movie) => {
    if (favorites.some(fav => fav.id === movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div className="mb-4 p-4 border">
      <h3 className="text-xl mb-2">Search Movies</h3>
      <form onSubmit={handleSearch}>
        <div className="mb-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Search by title"
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            placeholder="Search by director"
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            placeholder="Search by release year"
            className="p-2 border w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Search
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading movies</p>}
      {data && Array.isArray(data) && data.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg mb-2">Search Results</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((movie: Movie) => (
              <div key={movie.id} className="border p-4">
                <h5 className="text-xl">{movie.title}</h5>
                <img src={movie.poster} alt={movie.title} className="mb-2" />
                <p><strong>{movie.releaseDate}</strong></p>
                <p>{movie.description}</p>
                <p>Genres: <strong>{movieGenres(movie)}</strong></p>
                <div className="flex"><button
                  onClick={() => handleToggleFavorite(movie)}
                  className={`p-2 mt-2 ${favorites.some(fav => fav.id === movie.id) ? 'bg-red-500' : 'bg-green-500'} text-white`}
                >
                  {favorites.some(fav => fav.id === movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                  <Link to={`/movies/${movie.id}`} className="bg-blue-500 text-white p-2 mr-2">
                    View details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
