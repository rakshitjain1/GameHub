import React from 'react';
import './GameCard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../features/favoritesSlice';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.some((fav) => fav.id === game.id);

  const handleCardClick = () => {
    navigate(`/game/${game.id}`);
  };

  const handleBookmark = (e) => {
    e.stopPropagation(); // Prevent routing

    if (isFavorite) {
      dispatch(removeFromFavorites(game));
      toast.info(`${game.name} removed from bookmarks`);
    } else {
      dispatch(addToFavorites(game));
      toast.success(`${game.name} added to bookmarks`);
    }
  };

  return (
    <div className="game-card" onClick={handleCardClick}>
      <img
        src={game.background_image}
        alt={game.name}
        className="game-image"
      />

      <div className="game-info">
        <div className="game-header">
          <h3>{game.name}</h3>
          <button
            className="bookmark-btn"
            onClick={handleBookmark}
            title={isFavorite ? 'Remove from Bookmarks' : 'Add to Bookmarks'}
          >
            {isFavorite ? '✅' : '🔖'}
          </button>
        </div>

        <p className="game-description">
          {game.description_raw?.slice(0, 100) || "No description available"}...
        </p>

        <div className="game-tags">
          {game.tags?.slice(0, 3).map((tag) => (
            <span key={tag.id} className="tag">{tag.name}</span>
          ))}
        </div>

        <p className="game-category">
          <strong>Category:</strong> {game.genres?.map(g => g.name).join(', ') || "Unknown"}
        </p>

        <p className="game-rating">⭐ {game.rating} / 5</p>
      </div>
     
    </div>
  );
};

export default GameCard;
