import React, { useEffect, useState } from 'react';
import BaseCard from '../components/BaseCard';
import CardTitle from '../components/CardTitle';
import Button from '../components/Button';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/BoardBanner.css';

//ana board tasarımı 
const Board = () => {
    // URL'den boardId'yi al
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


  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);

  useEffect(() => {
    if (boardId) {
      // Mevcut board yoksa oluştur
      if (!boards[boardId]) {
        setBoards(prevBoards => ({
          ...prevBoards,
          [boardId]: {
            id: boardId,
            title: `Board ${boardId}`,
            lists: [
              { id: 'backlog', title: 'Backlog', cards: [
                { id: Date.now() + 1, title: 'Twilio integration', backgroundColor: '#C340A1', description: 'Create new note via SMS. Support text, audio, links, and media.' },
                { id: Date.now() + 2, title: 'Markdown support', backgroundColor: '#6A6DCD', description: 'Markdown shorthand converts to formatting' },
              ] },
              { id: 'todo', title: 'To Do', cards: [
                { id: Date.now() + 3, title: 'Tablet view', backgroundColor: '#D93535' },
                { id: Date.now() + 4, title: 'Mobile view', backgroundColor: '#D93535', description: 'Functions for both web responsive and native apps. Note: Android and iOS will need unique share icons.' },
                { id: Date.now() + 5, title: 'Audio recording in note', backgroundColor: '#6A6DCD', description: 'Show audio in a note and playback UI' },
                { id: Date.now() + 6, title: 'Bookmark in note', backgroundColor: '#6A6DCD', description: 'Show rich link UI in a note, and feature to render website screenshot.' },
                { id: Date.now() + 7, title: 'Image viewer', backgroundColor: '#6A6DCD', description: 'Opens when clicking on the thumbnail in the list or on the image in the note' },
              ] },
              { id: 'inprogress', title: 'In Progress', cards: [
                { id: Date.now() + 8, title: 'Desktop view', backgroundColor: '#D93535', description: 'PWA for website and native apps. Note: Windows and Mac will need unique share icons.' },
                { id: Date.now() + 9, title: 'Mobile home screen', backgroundColor: '#307FE2', description: 'Folders, tags, and notes lists are sorted by recent.' },
                { id: Date.now() + 10, title: 'Formatting options', backgroundColor: '#307FE2', description: 'Mobile formatting bar expands and collapses when tapping the format icon.' },
                { id: Date.now() + 11, title: 'Media in note', backgroundColor: '#6A6DCD', description: 'Image & video with player UI' },
              ] },
              { id: 'done', title: 'Done', cards: [
                { id: Date.now() + 12, title: 'Audio recording', backgroundColor: '#00A88B', description: 'Interface for when recording a new audio note' },
                { id: Date.now() + 13, title: 'Bookmarking', backgroundColor: '#00A88B', description: 'Interface for when creating a new link note.' },
              ] },
            ],
          },
        }));
      }

      // Son gezilen boardları güncelleme Board.jsx'ten kaldırıldı, App.jsx'e taşınacak
    }
  }, [boardId, boards]);



  const currentBoard = boards[boardId];

  if (!boardId) {
    const [newBoardName, setNewBoardName] = useState('');

    const handleCreateBoard = () => {
      if (newBoardName.trim()) {
        const newId = newBoardName.trim().toLowerCase().replace(/\s+/g, '-');
        setBoards(prevBoards => ({
          ...prevBoards,
          [newId]: {
            id: newId,
            title: newBoardName.trim(),
            lists: [
              { id: 'backlog', title: 'Backlog', cards: [] },
              { id: 'todo', title: 'To Do', cards: [] },
              { id: 'inprogress', title: 'In Progress', cards: [] },
              { id: 'done', title: 'Done', cards: [] },
            ],
          },
        }));
        setNewBoardName('');
        navigate(`/board/${newId}`); // Yeni board'a yönlendir
      } else {
        alert('Lütfen bir board adı girin.');
      }
    };

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
      {currentBoard ? (
        <>
          <div className="board-banner">
            <span>{currentBoard.title}</span>
            <span className="board-url">{window.location.pathname}</span>
          </div>

          <BaseCard title="Backlog">
            <CardTitle title="Twilio integration " backgroundColor="#C340A1"
              description={
                <>
                  Create new note via SMS. Support text, audio,<br />
                  links, and media.
                </>
              }
            />
            <Button
              title=" Markdown support " button='Formatting'  backgroundColor="#6A6DCD"
              description={
                <>
                  Markdown shorthand converts to <br /> formatting
                </>
              }
            />
          </BaseCard>

          <BaseCard title="To Do">
            <CardTitle title="Tablet view" backgroundColor="#D93535" />
            <CardTitle title="Mobile view" backgroundColor="#D93535"    description="Functions for both web responsive and  native apps. Note: Android and iOS will need unique share icons." />
            <Button title="Audio recording in note" button='Note interface' backgroundColor="#6A6DCD" description="Show audio in a note and playback UI" />
            <Button title="Bookmark in note" button='Note interface'  backgroundColor="#6A6DCD" description="Show rich link UI in a note, and feature to render website screenshot." />
            <CardTitle title="Image viewer"  backgroundColor="#6A6DCD" description="Opens when clicking on the thumbnail in the list or on the image in the note" />
          </BaseCard>

          <BaseCard title="In Progress">
            <CardTitle title="Desktop view" backgroundColor="#D93535" description="PWA for website and native apps. Note: Windows and Mac will need unique share icons." />
            <CardTitle title="Mobile home screen" backgroundColor="#307FE2" description=" Folders, tags, and notes lists are sorted by recent." />
            <CardTitle title="Formatting options " backgroundColor="#307FE2" description="Mobile formatting bar expands and collapses when tapping the format icon." />
            <Button title="Media in note" button='Note interface' backgroundColor="#6A6DCD" description="Image & video with player UI" />
          </BaseCard>

          <BaseCard title="Done">
            <Button title="Audio recording" button='New note ' backgroundColor="#00A88B" description="Interface for when recording a new audio note" />
            <Button title="Bookmarking" button='New note ' backgroundColor="#00A88B" description=" Interface for when creating a new link note." />
          </BaseCard>

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