import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { useGetMovieByIdQuery } from '../../services/movieApi';
import { addFavorite, removeFavorite, toggleWatched, updateNotes, updateRating } from '../../slices/favoritesSlice';
import { FavoriteMovie } from '../../models/FavoriteMovie';
import { getGenreNames } from '../../utils/genreUtils';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const favorites = useSelector((state: RootState) => state.favorites.movies);
  const favorite = useSelector((state: RootState) =>
    state.favorites.movies.find((movie: FavoriteMovie) => movie.id === parseInt(id ?? '0'))
  );

  const { data: movie, error: movieError, isLoading: movieLoading } = useGetMovieByIdQuery(parseInt(id ?? '0'));

  const dispatch = useDispatch();

  const [notes, setNotes] = useState(favorite?.notes || '');
  const [rating, setRating] = useState(favorite?.userRating || 0);

  if (movieLoading) return <div>Loading...</div>;
  if (movieError) return <div>Error loading movie details</div>;
  if (!movie) return <div>Movie not found</div>;
  const averageRating = movie.vote?.average ?? 0;
  const ratingCount = movie.vote?.count ?? 0;

  const isInCollection = favorites.some(fav => fav.id === movie.id);

  const handleToggleCollection = () => {
    if (isInCollection) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const handleToggleWatched = () => {
    dispatch(toggleWatched(movie.id));
  };

  const handleUpdateNotes = () => {
    dispatch(updateNotes({ id: movie.id, notes }));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 10) {
      setRating(value);
    }
  };

  const handleUpdateRating = () => {
    if (rating < 0 || rating > 10) {
      alert('Rating must be between 0 and 10');
      return;
    }
    dispatch(updateRating({ id: movie.id, rating }));
  };

  const genreNames = getGenreNames(movie.genres);

  return (
    <div className="border p-4">
      <h2 className="text-2xl mb-4">{movie.title}</h2>
      <img src={movie.poster} alt={movie.title} className="mb-4" />
      <div className="rating-info">
        <p><strong>Rating:</strong> {averageRating.toFixed(1)} / 10 <strong>Votes:</strong> {ratingCount}</p>
      </div>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Genre:</strong> {genreNames}</p>
      <p><strong>Watched:</strong> {favorite?.watched ? 'Yes' : 'No'}</p>
      <p><strong>Your Rating:</strong> {favorite?.userRating || 'Not rated'}</p>
      <div className="mt-4">
        <button disabled={!isInCollection}
          onClick={handleToggleWatched}
          className={`${!isInCollection ? 'bg-gray-500' : (favorite?.watched ? 'bg-red-500' : 'bg-green-500')} text-white p-2 mr-2`}>
          {favorite?.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
        </button>
        <button
          onClick={handleToggleCollection}
          className={`p-2 ${isInCollection ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {isInCollection ? 'Remove from Collection' : 'Add to Collection'}
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-xl mb-2">Personal Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full p-2 border"
        />
        <button onClick={handleUpdateNotes} className="bg-blue-500 text-white p-2 mt-2">
          Save Notes
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-xl mb-2">Personalized Rating</h3>
        <input
          type="number"
          value={rating}
          onChange={handleRatingChange}
          min="0"
          max="10"
          className="w-full p-2 border"
        />
        <button onClick={handleUpdateRating} className="bg-blue-500 text-white p-2 mt-2">
          Save Rating
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
