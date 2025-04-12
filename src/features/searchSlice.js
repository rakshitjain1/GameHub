import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    resetSearchQuery: (state) => {
      state.query = "";
    },
  },
});

export const { setSearchQuery, resetSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;