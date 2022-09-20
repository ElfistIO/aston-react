import {
  createListenerMiddleware,
  TypedStartListening,
} from "@reduxjs/toolkit";
import { setSearchInputState } from "../slices/searchSlice";
import type { RootState, AppDispatch } from "../store";

export const saveHistory = createListenerMiddleware();
type AppStartListening = TypedStartListening<RootState, AppDispatch>;
const startAppListening = saveHistory.startListening as AppStartListening;

startAppListening({
  actionCreator: setSearchInputState,
  effect: async (action, api) => {
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
