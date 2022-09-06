import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cardState from "./slices/cardSlice";
import searchReducer from "./slices/searchSlice";
import setsReducer from "./slices/setsSlice";

export const store = configureStore({
  reducer: {
    searchResult: searchReducer,
    sets: setsReducer,
    card: cardState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
