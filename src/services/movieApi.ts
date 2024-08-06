import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie } from '../models/Movie';
import { mapMovieData } from '../utils/movieUtils';
import { Genre } from '../models/Genre';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMovieById: builder.query<Movie, number>({
      query: (id) => `movie/${id}?api_key=${API_KEY}&append_to_response=credits`,

      transformResponse: async (response: any, meta, arg) => {
        return mapMovieData(response);
      }
    }),
    searchMovies: builder.query<Movie[], { title?: string; director?: string; releaseYear?: string }>({
      query: ({ title, director, releaseYear }) => {
        let query = `search/movie?api_key=${API_KEY}&query=`;
        if (title) {
          query += `${title}`;
        }
        if (releaseYear) {
          query += `&year=${releaseYear}`;
        }
        return query;
      },
      transformResponse: async (response: any, meta, arg) => {
        if (arg.director) {
          const directorsMovies = response.results
            .filter((person: any) => person.known_for_department === 'Directing')
            .flatMap((director: any) => {
              return director.known_for;
            });
          if (directorsMovies.length < 1) {
            const persons = await fetch(
              `${BASE_URL}/search/person?api_key=${API_KEY}&query=${arg.director}`
            ).then((res) => res.json());
            const directors = persons.results
              .filter((person: any) => person.known_for_department === 'Directing')
            const directorsMovies = directors.flatMap((director: any) => {
              return director.known_for;
            });
            const result = directorsMovies.filter((dm: any) =>
              !arg.title || response.results.find((r: any) => r.id === dm.id))
            response.results = result;
          }
          else {
            response.results = directorsMovies;
          }
        }
        return response.results.map(mapMovieData);
      },
    }),
    getGenres: builder.query<any, void>({
      query: () => `genre/movie/list?api_key=${API_KEY}`,
      transformResponse: (response: any) => response.genres as Genre[],
    }),
  }),
});

export const { useGetMovieByIdQuery, useSearchMoviesQuery, useGetGenresQuery } = movieApi;
