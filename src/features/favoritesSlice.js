import { createSlice } from "@reduxjs/toolkit";

// Initial state with localStorage support
const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.favorites.find(game => game.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action) => {
      // Support both payload as ID or as object with ID
      const id = typeof action.payload === "object" ? action.payload.id : action.payload;

      state.favorites = state.favorites.filter(game => game.id !== id);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
