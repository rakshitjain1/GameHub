import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, fetchTags } from "../../services/rawgApi";
import { setFilters } from "../../features/filtersSlice";
import { setFilters as setGameFilters, getGames } from "../../features/gameSlice";
import { MultiSelect } from "react-multi-select-component";
import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const loadFilters = async () => {
      const genreData = await fetchGenres();
      const tagData = await fetchTags();
      setGenres(genreData);
      setTags(tagData);
    };
    loadFilters();
  }, []);

  useEffect(() => {
    const genreValues = selectedGenres.map((g) => g.value);
    dispatch(setFilters({ key: "genres", value: genreValues }));
    dispatch(setGameFilters({ genres: genreValues }));
    dispatch(getGames());
  }, [selectedGenres]);

  useEffect(() => {
    const tagValues = selectedTags.map((t) => t.value);
    dispatch(setFilters({ key: "tags", value: tagValues }));
    dispatch(setGameFilters({ tags: tagValues }));
    dispatch(getGames());
  }, [selectedTags]);

  const years = Array.from({ length: 15 }, (_, i) => 2024 - i);
  const sortOptions = [
    { value: "", label: "None" },
    { value: "-rating", label: "Top Rated" },
    { value: "-released", label: "Recently Released" },
    { value: "-added", label: "Most Popular" },
  ];

  return (
    <aside className="sidebar">
      <h3>Filters</h3>

      <div className="filter-section">
        <h4>Genres</h4>
        <MultiSelect
          options={genres.map((g) => ({ label: g.name, value: g.slug }))}
          value={selectedGenres}
          onChange={setSelectedGenres}
          labelledBy="Select Genres"
        />
      </div>

      <div className="filter-section">
        <h4>Tags</h4>
        <MultiSelect
          options={tags.map((t) => ({ label: t.name, value: t.slug }))}
          value={selectedTags}
          onChange={setSelectedTags}
          labelledBy="Select Tags"
        />
      </div>

      <div className="filter-section">
        <h4>Release Year</h4>
        <input
          type="number"
          min="1980"
          max={new Date().getFullYear()}
          placeholder="Enter year"
          value={filters.year}
          onChange={(e) => {
            dispatch(setFilters({ key: "year", value: e.target.value }));
            dispatch(setGameFilters({ year: e.target.value }));
            dispatch(getGames());
          }}
          className="manual-year-input"
        />
      </div>

      <div className="filter-section">
        <h4>Popularity</h4>
        <select
          value={filters.ordering}
          onChange={(e) => {
            dispatch(setFilters({ key: "ordering", value: e.target.value }));
            dispatch(setGameFilters({ ordering: e.target.value }));
            dispatch(getGames());
          }}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;
