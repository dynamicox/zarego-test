import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { favoritesApi } from "@/shared/store/api/favorites";
import { RootState } from "..";
import { OMDBMovieShort } from "@/shared/types";

interface FavoritesState {
  favoriteMovies: OMDBMovieShort[];
}

const initialState: FavoritesState = {
  favoriteMovies: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<OMDBMovieShort[]>) => {
      state.favoriteMovies = action.payload;
    },
    addFavoriteLocal: (state, action: PayloadAction<OMDBMovieShort>) => {
      if (
        !state.favoriteMovies.some(
          (movie) => movie.imdbID === action.payload.imdbID
        )
      ) {
        state.favoriteMovies.push(action.payload);
      }
    },
    removeFavoriteLocal: (state, action: PayloadAction<OMDBMovieShort>) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.imdbID !== action.payload.imdbID
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      favoritesApi.endpoints.getAllFavorites.matchFulfilled,
      (state, { payload }) => {
        state.favoriteMovies = payload || [];
      }
    );
    builder.addMatcher(
      favoritesApi.endpoints.addToFavorites.matchFulfilled,
      (state, { meta }) => {
        const movieToAdd = meta.arg.originalArgs as OMDBMovieShort;
        if (
          !state.favoriteMovies.some(
            (movie) => movie.imdbID === movieToAdd.imdbID
          )
        ) {
          state.favoriteMovies.push(movieToAdd);
        }
      }
    );
    builder.addMatcher(
      favoritesApi.endpoints.removeFromFavorites.matchFulfilled,
      (state, { meta }) => {
        const itemToRemove = meta.arg.originalArgs as { imdbID: string };
        state.favoriteMovies = state.favoriteMovies.filter(
          (movie) => movie.imdbID !== itemToRemove.imdbID
        );
      }
    );
  },
});

export const { setFavorites, addFavoriteLocal, removeFavoriteLocal } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;

const selectFavoriteMovies = (state: RootState) =>
  state.favorites.favoriteMovies;

export const selectFavoriteMovieImdbIds = createSelector(
  [selectFavoriteMovies],
  (favoriteMovies: OMDBMovieShort[]) =>
    favoriteMovies.map((movie) => movie.imdbID)
);
