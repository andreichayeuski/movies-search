import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetMovieByIdQuery } from '../../services/movieApi';
import { removeFavorite, toggleWatched } from '../../slices/favoritesSlice';
import { FavoriteMovie } from '../../models/FavoriteMovie';
import { Movie } from '../../models/Movie';
import { getGenreNames } from '../../utils/genreUtils';

interface MovieCardProps {
  movie: FavoriteMovie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch();
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const { data, error, isLoading } = useGetMovieByIdQuery(movie.id);

  useEffect(() => {
    if (data) {
      setMovieDetails(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movie details.</div>;
  if (!movieDetails) return <div>No movie data</div>;

  const genreNames = getGenreNames(movieDetails.genres);

  const handleRemove = (id: number) => {
    dispatch(removeFavorite(id));
  };

  const handleToggleWatched = (id: number) => {
    dispatch(toggleWatched(id));
  };

  return (
    <div key={movie.id} className="border p-4">
      <h3 className="text-xl">{movieDetails.title}</h3>
      <img src={movieDetails.poster} alt={movieDetails.title} className="w-24 h-auto mb-2" />
      <p>Director: {movieDetails.director}</p>
      <p>Genre: {genreNames}</p>
      <p>Watched: {movie.watched ? 'Yes' : 'No'}</p>
      <div className="mt-2">
        <Link to={`/movies/${movie.id}`} className="bg-blue-500 text-white p-2 mr-2">
          View
        </Link>
        <button
          onClick={() => handleRemove(movie.id)}
          className="bg-red-500 text-white p-2 mr-2"
        >
          Remove
        </button>
        <button
          onClick={() => handleToggleWatched(movie.id)}
          className={`p-2 text-white ${movie.watched ? 'bg-orange-500' : 'bg-green-500'}`}
        >
          {movie.watched ? 'Unwatch' : 'Watch'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
