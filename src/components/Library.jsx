import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "../features/favoritesSlice";
import "./Library.css";

const Library = () => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  if (!favorites.length) return <p>No bookmarked games yet.</p>;

  return (
    <div className="library-container">
      {favorites.map((game) => (
        <div key={game.id} className="library-card">
          <img
            src={game.background_image}
            alt={game.name}
            className="library-image"
          />

          <div className="library-info">
           

            <p className="library-description">
              {game.description_raw || "No description available..."}
            </p>

            <p className="library-tags">
              {game.tags?.length
                ? game.tags.slice(0, 3).map((tag) => tag.name).join(", ")
                : "No tags"}
            </p>

            <p className="library-category">
              Category:{" "}
              {game.genres?.length ? game.genres[0].name : "N/A"}
            </p>

            <p className="library-rating">
              ⭐ {game.rating?.toFixed(2) || "N/A"} / 5
            </p>

            <button
              className="library-remove-btn"
              onClick={() => dispatch(removeFromFavorites(game.id))}
            >
              Remove Bookmark
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Library;
