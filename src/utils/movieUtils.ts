import { Crew } from '../models/Crew';
import { Movie } from '../models/Movie';

export const mapMovieData = (movie: any): Movie => {
  return {
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    credits: movie.credits,
    director: (movie.credits?.crew as Crew[])?.find(crewMember => crewMember?.job === 'Director')?.name || 'Unknown',
    genres: movie.genres ?? [],
    genre_ids: movie.genre_ids ?? [],
    poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
    releaseDate: movie.release_date,
    watched: false,
    vote: {
        average: movie.vote_average ?? null,
        count: movie.vote_count ?? null
    }
  };
};
