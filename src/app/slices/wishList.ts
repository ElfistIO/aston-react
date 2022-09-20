import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

interface WishListState {
  wishList: DocumentData[] | undefined;
}

const initialState: WishListState = {
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
