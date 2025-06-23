import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Routes ve Route import edildi
import "./App.css";
import Board from "../src/pages/Board";
import RecentPages from './components/RecentPages';

const App = () => {
  const location = useLocation();
  const [visitedBoards, setVisitedBoards] = useState(() => {
    try {
      const storedVisitedBoards = JSON.parse(localStorage.getItem('visitedPages')) || [];
      return storedVisitedBoards;
    } catch (e) {
      console.error("Failed to parse visitedPages from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const boardId = pathSegments[2];

    if (boardId) {
      // Board başlığını localStorage'dan al
      let boardTitle = `Board ${boardId}`;
      try {
        const boards = JSON.parse(localStorage.getItem('boards')) || {};
        if (boards[boardId] && boards[boardId].title) {
          boardTitle = boards[boardId].title;
        }
      } catch (e) {
        // ignore
      }
      const newVisitedBoards = [{ id: boardId, title: boardTitle }, ...visitedBoards.filter(b => b.id !== boardId)];
      const limitedVisitedBoards = newVisitedBoards.slice(0, 10);
      localStorage.setItem('visitedPages', JSON.stringify(limitedVisitedBoards));
      setVisitedBoards(limitedVisitedBoards);
    }
  }, [location.pathname]); // Sadece location.pathname'e bağlı

  const handleClearVisited = () => {
    localStorage.removeItem('visitedPages');
    setVisitedBoards([]);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', padding: '20px', gap: '16px' }}>
      <Routes>
        <Route path="/" element={<Board />} /> {/* Ana sayfa */}
        <Route path="/board/:boardId" element={<Board />} /> {/* Dinamik board sayfası */}
      </Routes>
      {visitedBoards.length > 0 && (
        <RecentPages visitedBoards={visitedBoards} handleClearVisited={handleClearVisited} />
      )}
    </div>
  );
};

export default App;
