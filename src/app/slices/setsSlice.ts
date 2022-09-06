import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as Scry from "scryfall-sdk";

interface setsState {
  sets: Scry.Set[];
}

const initialState: setsState = {
  sets: [],
};

export const setsSlice = createSlice({
  name: "sets",
  initialState,
  reducers: {
    setSets: (state, action: PayloadAction<Scry.Set[]>) => {
      state.sets = action.payload;
    },
  },
});

export const { setSets } = setsSlice.actions;

export default setsSlice.reducer;
