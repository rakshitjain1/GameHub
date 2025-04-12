import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameCard from '../components/card/GameCard';
import { getGames, setPage } from '../features/gameSlice';
import "../components/Gamelist/Gamelist.css";

const Home = () => {
  const dispatch = useDispatch();
  const { games, loading, error, filters, count } = useSelector((state) => state.games);
  const page = filters.page;

  const itemsPerPage = 20;
  const totalPages = Math.max(1, Math.ceil(count / itemsPerPage));

  const handlePrev = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

  const handleNext = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
  };

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch, page]);

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>Error: {typeof error === 'object' ? error.detail || 'Error occurred' : error}</p>;

  return (
    <>
      <div className="game-list">
        {games.length > 0 ? (
          games.map((game) => <GameCard key={game.id} game={game} />)
        ) : (
          <p>No games found</p>
        )}
      </div>
      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>⬅ Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>Next ➡</button>
      </div>
    </>
  );
};

export default Home;
