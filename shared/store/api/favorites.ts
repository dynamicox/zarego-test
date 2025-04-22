import { OMDBMovieShort } from "@/shared/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getAllFavorites: builder.query<OMDBMovieShort[], void>({
      query: () => "/favorites",
    }),
    addToFavorites: builder.mutation<void, OMDBMovieShort>({
      query: (moovie) => {
        console.log(moovie);
        return {
          url: `/favorites`,
          method: "POST",
          body: moovie,
        };
      },
      invalidatesTags: ["Favorite"],
    }),
    removeFromFavorites: builder.mutation<void, OMDBMovieShort>({
      query: (moovie) => {
        console.log(moovie);
        return {
          url: `/favorites`,
          method: "DELETE",
          body: moovie,
        };
      },
      invalidatesTags: ["Favorite"],
    }),
  }),
  tagTypes: ["Favorite"],
});

export const {
  useGetAllFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = favoritesApi;
