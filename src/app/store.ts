import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { magicApi } from "./slices/apiSlice";

import cardState from "./slices/cardSlice";
import searchReducer from "./slices/searchSlice";
import setsReducer from "./slices/setsSlice";

export const store = configureStore({
  reducer: {
    searchResult: searchReducer,
    sets: setsReducer,
    card: cardState,
    [magicApi.reducerPath]: magicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(magicApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
