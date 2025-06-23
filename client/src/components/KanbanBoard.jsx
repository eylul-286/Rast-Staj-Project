import React from 'react';
// Drag & Drop context ve elemanları
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Her listeyi saran kart kutusu
import BaseCard from './BaseCard';
// Kart içerik bileşenleri
import CardTitle from './CardTitle';
import Button from './Button';

// KanbanBoard bileşeni, props olarak board verisini ve board'u güncelleyecek setBoard fonksiyonunu alır
const KanbanBoard = ({ board, setBoard }) => {

  // Sürükleme işlemi tamamlandığında çalışır
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // Eğer kart bir yere bırakılmadan sürüklenme iptal edildiyse çık
    if (!destination) return;

    // Kaynağın ve hedefin bağlı olduğu listeleri bul
    const sourceList = board.lists.find(list => list.id === source.droppableId);
    const destList = board.lists.find(list => list.id === destination.droppableId);

    // Kaynak listedeki kartları klonla ve taşınan kartı çıkar
    const sourceCards = [...sourceList.cards];
    const [movedCard] = sourceCards.splice(source.index, 1);

    // Eğer aynı liste içinde taşınıyorsa:
    if (source.droppableId === destination.droppableId) {
      // Kartı yeni konuma ekle
      sourceCards.splice(destination.index, 0, movedCard);

      // O listeyi güncelle ve state'i değiştir
      const updatedLists = board.lists.map(list =>
        list.id === source.droppableId
          ? { ...list, cards: sourceCards }
          : list
      );

      setBoard({ ...board, lists: updatedLists });

    } else {
      // Eğer farklı listeye taşınıyorsa:
      const destCards = [...destList.cards];
      destCards.splice(destination.index, 0, movedCard);

      // Hem kaynak hem hedef listeleri güncelle
      const updatedLists = board.lists.map(list => {
        if (list.id === source.droppableId) {
          return { ...list, cards: sourceCards };
        } else if (list.id === destination.droppableId) {
          return { ...list, cards: destCards };
        } else {
          return list; // Diğer listeleri değiştirme
        }
      });

      setBoard({ ...board, lists: updatedLists });
    }
  };

  // DragDropContext: tüm drag & drop işlemlerini sarar
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board-container" style={{ display: 'flex', gap: '20px' }}>
        {/* Her liste için bir Droppable alan oluştur */}
        {board.lists.map((list) => (
          <Droppable droppableId={list.id} key={list.id}>
            {(provided) => (
              // Droppable alanı tanımla
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {/* Liste başlığı ve içeriği */}
                <BaseCard title={list.title}>
                  {/* Her kart için Draggable oluştur */}
                  {list.cards.map((card, index) => (
                    <Draggable draggableId={String(card.id)} index={index} key={card.id}>
                      {(provided) => (
                        // Kartın sürüklenebilir alanı
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {/* Kart açıklamalıysa Button, değilse sadece başlık */}
                          {card.description ? (
                            <Button
                              title={card.title}
                              button="Move"
                              backgroundColor={card.backgroundColor}
                              description={card.description}
                            />
                          ) : (
                            <CardTitle
                              title={card.title}
                              backgroundColor={card.backgroundColor}
                            />
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {/* Sürükleme sırasında boş alan oluşması için */}
                  {provided.placeholder}
                </BaseCard>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
