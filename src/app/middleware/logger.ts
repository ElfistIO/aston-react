import {
  createListenerMiddleware,
  TypedStartListening,
} from "@reduxjs/toolkit";
import { setSearchState } from "../slices/searchSlice";
import type { RootState, AppDispatch } from "../store";

type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const saveHistory = createListenerMiddleware();
const startAppListening = saveHistory.startListening as AppStartListening;

startAppListening({
  actionCreator: setSearchState,
  effect: async (action) => {
    const prevState = localStorage.getItem("search query");
    if (!prevState) {
      localStorage.setItem("search query", JSON.stringify(action.payload));
    } else {
      const newState = JSON.stringify(
        JSON.parse(prevState) + `_${action.payload}`
      );
      localStorage.setItem("search query", newState);
    }
  },
});
