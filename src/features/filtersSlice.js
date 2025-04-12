import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: [],
  tags: [],
  platforms: "",
  year: "",
  rating: "",
  ordering: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      const { key, value } = action.payload;

      if (Array.isArray(state[key])) {
        state[key] = value;
      } else {
        state[key] = value;
      }
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
