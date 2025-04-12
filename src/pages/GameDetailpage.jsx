import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import "./GameDeatailpage.css";

const GameDetailPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameResponse = await axiosInstance.get(`/games/${id}`);
        setGame(gameResponse.data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    const fetchScreenshots = async () => {
      try {
        const shotsResponse = await axiosInstance.get(`/games/${id}/screenshots`);
        setScreenshots(shotsResponse.data.results);
      } catch (error) {
        console.error('Error fetching screenshots:', error);
      }
    };

    fetchGameDetails();
    fetchScreenshots();
  }, [id]);

  if (!game) return <div className="game-detail-container">Loading...</div>;

  return (
    <div className="game-detail-container">
      <div className="game-detail-card">
        <h1 className="game-title">{game.name}</h1>

        <img className="game-banner" src={game.background_image} alt={game.name} />

        <p className="game-description">{game.description_raw}</p>

        <div className="game-section">
          <h2 className="section-title">Screenshots</h2>
          <div className="screenshots-grid">
            {screenshots.map((shot) => (
              <div className="screenshot-box" key={shot.id}>
                <img src={shot.image} alt="Screenshot" className="screenshot" />
              </div>
            ))}
          </div>
        </div>

        <div className="game-section">
          <h2 className="section-title">Rating</h2>
          <p className="section-content">
            {game.rating} / 5 ({game.ratings_count} ratings)
          </p>
        </div>

        <div className="game-section">
          <h2 className="section-title">Price</h2>
          <p className="section-content">
            {game.price ? `$${game.price}` : 'Not available'}
          </p>
        </div>

        <div className="game-section">
          <h2 className="section-title">System Requirements</h2>
          {game.platforms?.map((p) => {
            const req = p.requirements;
            if (!req || (!req.minimum && !req.recommended)) return null;

            return (
              <div key={p.platform.id}>
                <p className="platform-name">{p.platform.name}</p>
                <p className="requirements">{req.minimum || req.recommended}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
