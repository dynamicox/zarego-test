import { OMDBMovieShort } from "@/shared/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recommendationsApi = createApi({
  reducerPath: "recommendationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/recommendations" }),
  endpoints: (builder) => ({
    getUserRecommendations: builder.query<OMDBMovieShort["imdbID"][], void>({
      query: () => "/user",
      transformResponse: (response: { recommendations: string[] }) =>
        response.recommendations,
    }),
    getRecommendationsByImdbIds: builder.mutation<
      OMDBMovieShort["imdbID"][],
      OMDBMovieShort["imdbID"][]
    >({
      query: (imdbIds) => ({
        url: "/imdb",
        method: "POST",
        body: { imdbIds },
      }),
      transformResponse: (response: {
        recommendations: OMDBMovieShort["imdbID"][];
      }) => response.recommendations,
    }),
  }),
});

export const {
  useGetUserRecommendationsQuery,
  useGetRecommendationsByImdbIdsMutation,
} = recommendationsApi;
