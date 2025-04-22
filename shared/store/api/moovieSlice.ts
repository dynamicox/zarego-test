import { OMDBMoovie, OMDBMovieShort, OMDBResponse } from "@/shared/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const OMDB_API_KEY = "c53d348b";

export const omdbApi = createApi({
  reducerPath: "omdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.omdbapi.com/" }),
  endpoints: (builder) => ({
    fetchMoviesBySearch: builder.query<OMDBResponse, string>({
      query: (searchTerm) => `?s=${searchTerm}&apikey=${OMDB_API_KEY}`,
    }),
    fetchMovieById: builder.query<OMDBMoovie, OMDBMovieShort["imdbID"]>({
      query: (movieId) => `?i=${movieId}&apikey=${OMDB_API_KEY}&plot=full`,
    }),
  }),
});

export const { useFetchMoviesBySearchQuery, useFetchMovieByIdQuery } = omdbApi;
