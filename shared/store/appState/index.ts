import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { omdbApi } from "../api/moovieSlice";

export interface AppStateSliceInterface {
  heroHeaderImgUrl?: string;
  searchQuery: string;
}

const initialState: AppStateSliceInterface = {
  heroHeaderImgUrl: undefined,
  searchQuery: "",
};

export const AppStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setHeaderImage: (state, action: PayloadAction<string>) => {
      state.heroHeaderImgUrl = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      console.log("Search Query Slice:", action.payload);
    },
  },
});

export const { setHeaderImage, setSearchQuery } = AppStateSlice.actions;
export default AppStateSlice.reducer;

const selectAppState = (state: RootState): AppStateSliceInterface =>
  state.appState;

export const selectHeroHeaderImgUrl = createSelector(
  [selectAppState],
  (appState) => appState.heroHeaderImgUrl
);

export const selectSearchQuery = createSelector(
  [selectAppState],
  (appState) => appState.searchQuery
);
