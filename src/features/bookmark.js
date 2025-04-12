import { createSlice } from "@reduxjs/toolkit";

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: [],
  reducers: {
    addToBookmarks: (state, action) => {
      const exists = state.find((game) => game.id === action.payload.id);
      if (!exists) state.push(action.payload);
    },
    removeFromBookmarks: (state, action) => {
      return state.filter((game) => game.id !== action.payload);
    },
  },
});

export const { addToBookmarks, removeFromBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
