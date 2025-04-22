"use client";

import React from "react";
import { useGetUserRecommendationsQuery } from "@/shared/store/api/reccomendations";
import MoovieCardContainer from "@/components/organisms/MoovieCardContainer/MoovieCardContainer";
import Skeleton from "@/components/atoms/Skeleton/Skeleton";

const AIRecommendations = () => {
  // !TODO: ADD CALL FOR RECCOMENDATIONS WITH NO FAVS

  const {
    data: recommendations,
    isLoading: isRecommendationsLoading,
    isError: isRecommendationsError,
  } = useGetUserRecommendationsQuery();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">AI Recommendations</h2>
      {isRecommendationsLoading && <Skeleton className="h-44" />}
      {recommendations && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {recommendations.map((item) => (
            <MoovieCardContainer key={item} movieId={item} />
          ))}
        </div>
      )}
      {isRecommendationsError && (
        <p className="text-red-500 text-sm">
          Error fetching recommendations. Please try again.
        </p>
      )}
    </div>
  );
};

export default AIRecommendations;
