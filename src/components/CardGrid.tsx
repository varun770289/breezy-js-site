
import React from 'react';
import Card from './Card';

interface CardGridProps {
  cards: Array<{id: number, type: string, flipped: boolean, matched: boolean}>;
  onCardClick: (id: number) => void;
  difficulty: 'easy' | 'medium' | 'hard';
}

const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick, difficulty }) => {
  const gridClasses = {
    easy: "grid-cols-3 md:grid-cols-4",
    medium: "grid-cols-4 md:grid-cols-4",
    hard: "grid-cols-4 md:grid-cols-6"
  };

  return (
    <div className={`w-full max-w-3xl grid gap-4 ${gridClasses[difficulty]} mt-6 mb-8`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          type={card.type}
          flipped={card.flipped}
          matched={card.matched}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default CardGrid;
