import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Card } from "scryfall-sdk";

interface CardState {
  card: Card;
}

const initialState: CardState = {
  card: {} as Card,
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCardState: (state, action: PayloadAction<Card>) => {
      state.card = action.payload;
    },
  },
});

export const { setCardState } = cardSlice.actions;

export default cardSlice.reducer;
