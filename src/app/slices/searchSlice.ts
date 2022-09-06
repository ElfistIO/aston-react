import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Card } from "scryfall-sdk";

interface SearchState {
  searchState: Array<Card>;
  searchInput: string;
}

const initialState: SearchState = {
  searchState: [],
  searchInput: "",
};

export const searchSlice = createSlice({
  name: "searchState",
  initialState,
  reducers: {
    setSearchState: (state, action: PayloadAction<Array<Card>>) => {
      state.searchState = action.payload;
    },
    setSearchInputState: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
  },
});

export const { setSearchState, setSearchInputState } = searchSlice.actions;

export default searchSlice.reducer;
