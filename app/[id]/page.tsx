"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { OMDBMovieShort } from "@/shared/types";
import { useFetchMovieByIdQuery } from "@/shared/store/api/moovieSlice";
import MoovieDetails from "@/components/organisms/MoovieDetails/MoovieDetails";
import { useGetAllFavoritesQuery } from "@/shared/store/api/favorites";
import SentimentSection from "@/components/organisms/SentimentSection/SentimentSection";
import AIRecommendations from "@/components/organisms/Recommendations/Recommendations";
import { useAppDispatch } from "@/shared/store/hooks";
import { setHeaderImage } from "@/shared/store/appState";

interface MooviePageParams {
  [key: string]: string | undefined;
  id?: OMDBMovieShort["imdbID"];
}

const page = () => {
  const params = useParams<MooviePageParams>();
  useGetAllFavoritesQuery();
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useFetchMovieByIdQuery(params?.id || "");

  useEffect(() => {
    if (data?.Poster) {
      dispatch(setHeaderImage(data.Poster));
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading movie...</div>;
  }

  if (error || !data) {
    return <div>Error loading movie.</div>;
  }

  return (
    <div className="bg-black text-white min-h-[50vh] flex flex-col px-4">
      <div className="container mx-auto py-8">
        <MoovieDetails data={data} />
        <div className="my-8">
          <SentimentSection title={data?.Title} />
        </div>
        <AIRecommendations />
      </div>
    </div>
  );
};

export default page;
