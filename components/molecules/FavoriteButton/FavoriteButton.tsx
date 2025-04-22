import React, { useState, useCallback } from "react";
import {
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} from "@/shared/store/api/favorites";
import { useAppSelector } from "@/shared/store/hooks";
import { selectFavoriteMovieImdbIds } from "@/shared/store/favorites";
import { OMDBMovieShort } from "@/shared/types";
import { HeartIconSolid } from "@/components/atoms/HeartIcon/HeartIcon";

interface FavoriteButtonProps {
  moovie: OMDBMovieShort;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ moovie }) => {
  const [addMoovietoFavorite, { isLoading: isAdding }] =
    useAddToFavoritesMutation();
  const [removeMoovieFromFavorite, { isLoading: isRemoving }] =
    useRemoveFromFavoritesMutation();
  const favoriteImdbIds = useAppSelector(selectFavoriteMovieImdbIds);
  const [isToggling, setIsToggling] = useState(false);
  const isCurrentlyFavorite = favoriteImdbIds?.includes(moovie.imdbID);
  const isFavoriteButtonLoading = isAdding || isRemoving || isToggling;

  const handleFavoriteClick = useCallback(async () => {
    if (isAdding || isRemoving || isToggling) {
      return;
    }

    setIsToggling(true);
    try {
      if (isCurrentlyFavorite) {
        await removeMoovieFromFavorite(moovie);
      } else {
        await addMoovietoFavorite(moovie);
      }
    } finally {
      setIsToggling(false);
    }
  }, [
    moovie,
    isAdding,
    isRemoving,
    isToggling,
    isCurrentlyFavorite,
    removeMoovieFromFavorite,
    addMoovietoFavorite,
  ]);

  return (
    <button
      onClick={handleFavoriteClick}
      type="button"
      disabled={isFavoriteButtonLoading}
      className={`${isCurrentlyFavorite ? "text-red-600" : ""} ${
        isFavoriteButtonLoading
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      }`}
      aria-label={
        isFavoriteButtonLoading
          ? "Adding to/Removing from favorites"
          : isCurrentlyFavorite
          ? "Remove from favorites"
          : "Add to favorites"
      }
      title={isCurrentlyFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <HeartIconSolid />
    </button>
  );
};

export default FavoriteButton;
