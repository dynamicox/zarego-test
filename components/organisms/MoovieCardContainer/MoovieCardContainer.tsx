import React from "react";
import MoovieCard from "../../molecules/MoovieCard/MoovieCard";
import { OMDBMovieShort } from "@/shared/types";
import { useFetchMovieByIdQuery } from "@/shared/store/api/moovieSlice";
import Skeleton from "@/components/atoms/Skeleton/Skeleton";

interface MovieCardContainerPropsWithMovie {
  movie: OMDBMovieShort;
  movieId?: never;
}

interface MovieCardContainerPropsWithMovieId {
  movie?: never;
  movieId: OMDBMovieShort["imdbID"];
}

type MovieCardContainerProps =
  | MovieCardContainerPropsWithMovie
  | MovieCardContainerPropsWithMovieId;

const MoovieCardContainer: React.FC<MovieCardContainerProps> = ({
  movieId,
  movie,
}) => {
  const {
    data: fetchedMovie,
    isLoading,
    isError,
  } = useFetchMovieByIdQuery(movieId || "", {
    skip: !!movie,
  });

  const displayMovie: OMDBMovieShort | undefined = movie || fetchedMovie;

  if (isLoading) {
    return <Skeleton className="h-[220px] min-w-[320px]" />;
  }

  if (isError) {
    return <></>;
  }

  if (!displayMovie) {
    return <></>;
  }

  return <MoovieCard movie={displayMovie} />;
};

export default MoovieCardContainer;
