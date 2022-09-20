import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

interface wishListState {
  wishList: DocumentData[] | undefined;
}

const initialState: wishListState = {
  wishList: undefined,
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    setWishList: (state, action: PayloadAction<DocumentData[]>) => {
      state.wishList = action.payload;
    },
  },
});

export const { setWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
