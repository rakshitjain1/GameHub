import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from '../features/gameSlice';
import filtersReducer from '../features/filtersSlice';
import searchReducer from '../features/searchSlice';
import favoritesReducer from '../features/favoritesSlice';
import bookmarkReducer from '../features/bookmark'

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    filters: filtersReducer,
    search: searchReducer,
    favorites: favoritesReducer,
    bookmark:bookmarkReducer,
  },
});
