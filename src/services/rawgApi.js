// src/services/rawgApi.js
import axiosInstance from './axiosInstance';

// Fetch games with dynamic filters
export const fetchGames = async (filters = {}, page = 1, search = '') => {
  const params = {
    page,
    page_size: 20,
    search: search || undefined,
    genres: filters.genres?.length ? filters.genres.join(",") : undefined,
    tags: filters.tags?.length ? filters.tags.join(",") : undefined,
    platforms: filters.platforms?.length ? filters.platforms.join(",") : undefined,
    ordering: filters.ordering || undefined,
    dates: filters.year ? `${filters.year}-01-01,${filters.year}-12-31` : undefined,
  };

  const response = await axiosInstance.get('/games', { params });
  return response.data;
};

// Fetch genres for filter dropdown
export const fetchGenres = async () => {
  const response = await axiosInstance.get('/genres');
  return response.data.results;
};

// Fetch tags for filter dropdown
export const fetchTags = async () => {
  const response = await axiosInstance.get('/tags');
  return response.data.results;
};

// Fetch platforms for filter dropdown
export const fetchPlatforms = async () => {
  const response = await axiosInstance.get('/platforms/lists/parents');
  return response.data.results;
};

// Fetch game details by ID
export const fetchGameDetails = async (id) => {
  const response = await axiosInstance.get(`/games/${id}`);
  return response.data;
};

// Fetch screenshots for a specific game
export const fetchGameScreenshots = async (id) => {
  const response = await axiosInstance.get(`/games/${id}/screenshots`);
  return response.data.results;
};
