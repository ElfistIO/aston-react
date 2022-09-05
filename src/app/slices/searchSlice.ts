import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Card } from "scryfall-sdk";

interface searchState {
  searchResult: Array<Card>;
  searchInput: string;
}

const initialState: searchState = {
  searchResult: [],
  searchInput: "",
};

export const searchSlice = createSlice({
  name: "searchResult",
  initialState,
  reducers: {
    searchReducer: (state, action: PayloadAction<Array<Card>>) => {
      state.searchResult = action.payload;
    },
    searchInputReducer: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
  },
});

export const { searchReducer, searchInputReducer } = searchSlice.actions;

export default searchSlice.reducer;
