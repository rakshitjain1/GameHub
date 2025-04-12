import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./GameList.css";
import { setPage } from "../../features/gameSlice";

const isEnglish = (text) => /^[A-Za-z0-9\s.,!?'-]+$/.test(text);

const GameList = () => {
  const { games, loading, error } = useSelector((state) => state.games);
  const [localGames, setLocalGames] = useState([]);
  const [newGameName, setNewGameName] = useState("");

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>Error: {error}</p>;

  // Combine Redux games + local games
  const allGames = [...games, ...localGames];

  // Filter games with only English tags
  const filteredGames = allGames.filter((game) =>
    game.tags.every((tag) => isEnglish(tag.name))
  );
  const dispatch = useDispatch();
  const {  page } = useSelector((state) => state.games);
  const handleAddGame = () => {
    if (!newGameName.trim()) return;

    const newGame = {
      id: Date.now(),
      name: newGameName,
      rating: 0,
      background_image: "https://via.placeholder.com/300x180?text=New+Game",
      tags: [{ name: "English" }],
    };

    setLocalGames([...localGames, newGame]);
    setNewGameName("");
  };

  const handleDeleteGame = (id) => {
    setLocalGames(localGames.filter((game) => game.id !== id));
  };

  return (
    <>
    <div className="game-list">
      {/* Add Game Section */}
      <div className="add-game-form">
        <input
          type="text"
          value={newGameName}
          onChange={(e) => setNewGameName(e.target.value)}
          placeholder="Enter game name"
        />
        <button onClick={handleAddGame}>Add Game</button>
      </div>

      {/* Game Cards */}
      {filteredGames.length > 0 ? (
        filteredGames.map((game) => (
          <div key={game.id} className="game-card">
            <img
              src={game.background_image}
              alt={game.name}
              className="game-image"
            />
            <div className="game-info">
              <h3>{game.name}</h3>
              <p>Rating: {game.rating}</p>
              {/* Show delete only for local games */}
              {localGames.find((g) => g.id === game.id) && (
                <button onClick={() => handleDeleteGame(game.id)}>Delete</button>
              )}
            </div>
            <div className="pagination">
        <button onClick={() => dispatch(setPage(page - 1))} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => dispatch(setPage(page + 1))}>Next</button>
      </div>
          </div>
        ))
      ) : (
        <p>No English-tagged games found.</p>
      )}
       
    </div>
    
    </>
  );
};

export default GameList;
