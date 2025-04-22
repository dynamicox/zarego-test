"use client";
import React from "react";
import { OMDBMovieShort } from "@/shared/types";
import { useFetchSentimentQuery } from "@/shared/store/api/sentiment";
import Skeleton from "@/components/atoms/Skeleton/Skeleton";

interface SentimentSectionProps {
  title?: OMDBMovieShort["Title"];
}

const SentimentSection: React.FC<SentimentSectionProps> = ({ title }) => {
  const { data: sentimentData, isLoading: isSentimentLoading } =
    useFetchSentimentQuery(title || "", {
      skip: !title,
    });

  return (
    <div>
      <h3 className="font-semibold mb-2 text-2xl">Audience Sentiment</h3>
      {isSentimentLoading ? (
        <>
          <Skeleton className="mb-2 h-3 w-36" />
          <Skeleton className="mb-2 h-3 w-20" />
          <Skeleton className="h-44" />
        </>
      ) : (
        <>
          <div className="mb-6">
            <p className="font-bold ">{title}</p>
            <span>- {sentimentData?.overall}</span>
          </div>
          <p>{sentimentData?.summary}</p>
        </>
      )}
    </div>
  );
};

export default SentimentSection;
