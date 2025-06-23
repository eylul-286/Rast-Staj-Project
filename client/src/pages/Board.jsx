import React, { useEffect, useState } from 'react';
import BaseCard from '../components/BaseCard';
import { useParams, useNavigate } from 'react-router-dom';
import KanbanBoard from '../components/KanbanBoard';

const Board = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [boards, setBoards] = useState(() => {
    try {
      const storedBoards = JSON.parse(localStorage.getItem('boards')) || {};
      return storedBoards;
    } catch (e) {
      console.error("Failed to parse boards from localStorage", e);
      return {};
    }
  });

  const [boardState, setBoardState] = useState(null); // aktif board'ı burada tutacağız

  useEffect(() => {
    if (boardId) {
      if (!boards[boardId]) {
        const newBoard = {
          id: boardId,
          title: `Board ${boardId}`,
          lists: [
            { id: 'backlog', title: 'Backlog', cards: [] },
            { id: 'todo', title: 'To Do', cards: [] },
            { id: 'inprogress', title: 'In Progress', cards: [] },
            { id: 'done', title: 'Done', cards: [] },
          ],
        };
        const updatedBoards = { ...boards, [boardId]: newBoard };
        setBoards(updatedBoards);
        setBoardState(newBoard);
      } else {
        setBoardState(boards[boardId]);
      }
    }
  }, [boardId]);

  useEffect(() => {
    if (boardState) {
      const updatedBoards = { ...boards, [boardId]: boardState };
      setBoards(updatedBoards);
      localStorage.setItem('boards', JSON.stringify(updatedBoards));
    }
  }, [boardState]);

  const [newBoardName, setNewBoardName] = useState('');

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      const newId = newBoardName.trim().toLowerCase().replace(/\s+/g, '-');
      const newBoard = {
        id: newId,
        title: newBoardName.trim(),
        lists: [
          { id: 'backlog', title: 'Backlog', cards: [] },
          { id: 'todo', title: 'To Do', cards: [] },
          { id: 'inprogress', title: 'In Progress', cards: [] },
          { id: 'done', title: 'Done', cards: [] },
        ],
      };
      const updatedBoards = { ...boards, [newId]: newBoard };
      setBoards(updatedBoards);
      setNewBoardName('');
      navigate(`/board/${newId}`);
    } else {
      alert('Lütfen bir board adı girin.');
    }
  };

  if (!boardId) {
    return (
      <div className="board-container">
        <BaseCard title="Mevcut Boardlar">
          {Object.keys(boards).length > 0 ? (
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {Object.keys(boards).map(id => (
                <li key={id} style={{ marginBottom: 4 }}>
                  <a href={`/board/${id}`} style={{ color: '#6A6DCD' }}>{boards[id].title}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Henüz hiç board yok. Yeni bir board oluşturun!</p>
          )}
        </BaseCard>

        <BaseCard title="Yeni Board Oluştur">
          <div style={{ display: 'flex', marginTop: 16 }}>
            <input
              type="text"
              placeholder="Yeni board adı..."
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateBoard();
                }
              }}
              style={{ flexGrow: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button
              onClick={handleCreateBoard}
              style={{ marginLeft: 8, background: '#00A88B', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer' }}
            >
              Oluştur
            </button>
          </div>
        </BaseCard>
      </div>
    );
  }

  return (
    <div className="board-container">
      {boardState ? (
        <>
          <div className="board-banner">
            <span>{boardState.title}</span>
            <span className="board-url">{window.location.pathname}</span>
          </div>

          <KanbanBoard board={boardState} setBoard={setBoardState} />
        </>
      ) : (
        <BaseCard title="Board Bulunamadı">
          <p>Bu board mevcut değil veya yüklenemedi.</p>
        </BaseCard>
      )}
    </div>
  );
};

export default Board;
