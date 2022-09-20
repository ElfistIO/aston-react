import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { saveHistory } from "./middleware/logger";
import { magicApi } from "./slices/apiSlice";
import collection from "./slices/collection";
import searchReducer from "./slices/searchSlice";
import setsReducer from "./slices/setsSlice";
import wishList from "./slices/wishList";

export const store = configureStore({
  reducer: {
    searchResult: searchReducer,
    sets: setsReducer,
    collection: collection,
    wishList: wishList,
    [magicApi.reducerPath]: magicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(magicApi.middleware)
      .prepend(saveHistory.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
