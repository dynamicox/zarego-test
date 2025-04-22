import { SentimentData } from "@/shared/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sentimentApi = createApi({
  reducerPath: "sentimentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    fetchSentiment: builder.query<SentimentData, string>({
      queryFn: async (title, _arg, _extraOptions, fetchWithBQ) => {
        try {
          const result = await fetchWithBQ({
            url: `/sentiment`,
            method: "POST",
            body: { title },
          });

          if (result.error) {
            return { error: result.error };
          }

          return { data: result.data as SentimentData };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: String(error) } };
        }
      },
    }),
  }),
});

export const { useFetchSentimentQuery } = sentimentApi;
