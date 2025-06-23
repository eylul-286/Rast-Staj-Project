import React, { useState, useEffect } from 'react';
import '../styles/RecentPages.css';

const RecentPages = ({ visitedBoards, handleClearVisited }) => {
  return (
    <div className="recent-pages-container">
      <h3>Son Gezilen Boardlar</h3>
      <button onClick={handleClearVisited} style={{ marginBottom: 8, background: '#D93535', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}>Temizle</button>
      <ul>
        {visitedBoards.map((page, index) => (
          <li key={index}>
            <a href={`/board/${page.id}`}>{page.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPages;