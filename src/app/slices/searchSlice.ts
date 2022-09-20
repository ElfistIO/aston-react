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
    setSearchSort: (state, action: PayloadAction<string>) => {
      const sortBy = action.payload;
      switch (sortBy) {
        case "name":
          state.searchState = state.searchState.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case "set":
          state.searchState = state.searchState.sort((a, b) =>
            a.set_name.localeCompare(b.set_name)
          );
          break;
        case "rarity":
          state.searchState = state.searchState.sort((a, b) =>
            a.rarity.localeCompare(b.rarity)
          );
          break;
        case "color":
          state.searchState = state.searchState.sort((a, b) =>
            a.type_line?.localeCompare(b.type_line)
          );
          break;
        default:
          state.searchState = state.searchState.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
      }
    },
  },
});

export const { setSearchState, setSearchInputState, setSearchSort } =
  searchSlice.actions;

export default searchSlice.reducer;
