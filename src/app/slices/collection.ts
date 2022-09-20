import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

interface CollectionState {
  collection?: DocumentData[];
}

const initialState: CollectionState = {
  collection: undefined,
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollection: (state, action: PayloadAction<DocumentData[]>) => {
      state.collection = action.payload;
    },
  },
});

export const { setCollection } = collectionSlice.actions;

export default collectionSlice.reducer;
