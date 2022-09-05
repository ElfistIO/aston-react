import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as Scry from "scryfall-sdk";

interface setsState {
  sets: Scry.Set[];
}

const initialState: setsState = {
  sets: [] as Scry.Set[],
};

export const setsSlice = createSlice({
  name: "sets",
  initialState,
  reducers: {
    setsReducer: (state, action: PayloadAction<Scry.Set[]>) => {
      state.sets = action.payload;
    },
  },
});

export const { setsReducer } = setsSlice.actions;

export default setsSlice.reducer;
