import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { omdbApi } from "./api/moovieSlice";
import { sentimentApi } from "./api/sentiment";
import { favoritesApi } from "./api/favorites";
import { recommendationsApi } from "./api/reccomendations";
import favoritesReducer from "./favorites";
import appStateReducer from "./appState";

const createStore = (options?: ConfigureStoreOptions) => {
  return configureStore({
    reducer: {
      [omdbApi.reducerPath]: omdbApi.reducer,
      [sentimentApi.reducerPath]: sentimentApi.reducer,
      [favoritesApi.reducerPath]: favoritesApi.reducer,
      [recommendationsApi.reducerPath]: recommendationsApi.reducer,
      favorites: favoritesReducer,
      appState: appStateReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        omdbApi.middleware,
        sentimentApi.middleware,
        favoritesApi.middleware,
        recommendationsApi.middleware
      ),
    ...options,
  });
};

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
