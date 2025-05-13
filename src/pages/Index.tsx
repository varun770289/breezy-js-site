
import { useState, useEffect } from 'react';
import CardGrid from '@/components/CardGrid';
import GameHeader from '@/components/GameHeader';
import GameControls from '@/components/GameControls';
import WinModal from '@/components/WinModal';

const Index = () => {
  const [cards, setCards] = useState<Array<{id: number, type: string, flipped: boolean, matched: boolean}>>([]);
  const [flips, setFlips] = useState(0);
  const [firstCard, setFirstCard] = useState<number | null>(null);
  const [secondCard, setSecondCard] = useState<number | null>(null);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  
  const cardTypes = ['🚀', '🌟', '🎮', '🎯', '🎨', '🎭', '🎪', '🎡', '🎢', '🧸', '🎁', '🎸'];
  
  const difficultySettings = {
    easy: { pairs: 6, time: 60 },
    medium: { pairs: 8, time: 90 },
    hard: { pairs: 12, time: 120 }
  };
  
  useEffect(() => {
    resetGame();
  }, [difficulty]);
  
  useEffect(() => {
    let interval: number | undefined;
    
    if (gameStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => Math.max(0, prev - 1));
      }, 1000) as unknown as number;
    } else if (timer === 0 && gameStarted) {
      // Time's up logic
      setGameStarted(false);
    }
    
    return () => clearInterval(interval);
  }, [gameStarted, timer]);
  
  useEffect(() => {
    if (matches === difficultySettings[difficulty].pairs) {
      setGameWon(true);
      setGameStarted(false);
    }
  }, [matches, difficulty]);
  
  const resetGame = () => {
    const pairs = difficultySettings[difficulty].pairs;
    const selectedTypes = cardTypes.slice(0, pairs);
    
    // Create pairs of cards
    const cardPairs = [...selectedTypes, ...selectedTypes]
      .map((type, index) => ({
        id: index,
        type,
        flipped: false,
        matched: false
      }));
    
    // Shuffle the cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlips(0);
    setFirstCard(null);
    setSecondCard(null);
    setMatches(0);
    setGameWon(false);
    setTimer(difficultySettings[difficulty].time);
    setGameStarted(false);
  };
  
  const handleCardClick = (id: number) => {
    // Don't allow clicks if already checking a pair or card is already flipped/matched
    if (isChecking || 
        cards[id].flipped || 
        cards[id].matched || 
        firstCard === id ||
        !gameStarted) return;
    
    // Start the game when the first card is flipped
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    // Flip the card
    const updatedCards = [...cards];
    updatedCards[id].flipped = true;
    setCards(updatedCards);
    
    if (firstCard === null) {
      // First card of the pair
      setFirstCard(id);
    } else {
      // Second card of the pair
      setSecondCard(id);
      setFlips(flips + 1);
      setIsChecking(true);
      
      // Check if the cards match
      setTimeout(() => {
        checkForMatch(id);
      }, 800);
    }
  };
  
  const checkForMatch = (secondCardId: number) => {
    if (firstCard === null) return;
    
    const updatedCards = [...cards];
    
    if (cards[firstCard].type === cards[secondCardId].type) {
      // Match found
      updatedCards[firstCard].matched = true;
      updatedCards[secondCardId].matched = true;
      setMatches(matches + 1);
    } else {
      // No match
      updatedCards[firstCard].flipped = false;
      updatedCards[secondCardId].flipped = false;
    }
    
    setCards(updatedCards);
    setFirstCard(null);
    setSecondCard(null);
    setIsChecking(false);
  };
  
  const startGame = () => {
    resetGame();
    setGameStarted(true);
  };
  
  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    if (gameStarted) {
      // Confirm before changing difficulty during an active game
      if (window.confirm('Changing difficulty will reset the current game. Continue?')) {
        setDifficulty(newDifficulty);
      }
    } else {
      setDifficulty(newDifficulty);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex flex-col items-center py-8 px-4">
      <GameHeader 
        flips={flips} 
        matches={matches} 
        timer={timer}
        totalPairs={difficultySettings[difficulty].pairs}
      />
      
      <CardGrid 
        cards={cards} 
        onCardClick={handleCardClick} 
        difficulty={difficulty}
      />
      
      <GameControls 
        onReset={resetGame}
        onStart={startGame}
        isGameStarted={gameStarted}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
      />
      
      {gameWon && (
        <WinModal 
          flips={flips} 
          timeElapsed={difficultySettings[difficulty].time - timer}
          onPlayAgain={resetGame}
        />
      )}
    </div>
  );
};

export default Index;
