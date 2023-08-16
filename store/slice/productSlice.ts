import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = {
  product: null,
};

const productSlice = createSlice({
  name: "setProduct",
  initialState: initialFilterState,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
    },
  },
});

export const productAction = productSlice.actions;

export default productSlice.reducer;
