
import React from 'react';
import { Button } from '@/components/ui/button';

interface GameControlsProps {
  onReset: () => void;
  onStart: () => void;
  isGameStarted: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  onDifficultyChange: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  onReset, 
  onStart, 
  isGameStarted,
  difficulty,
  onDifficultyChange
}) => {
  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            className={difficulty === 'easy' ? 'bg-green-100 border-green-500' : ''}
            onClick={() => onDifficultyChange('easy')}>
            Easy
          </Button>
          <Button 
            variant="outline"
            className={difficulty === 'medium' ? 'bg-yellow-100 border-yellow-500' : ''}
            onClick={() => onDifficultyChange('medium')}>
            Medium
          </Button>
          <Button 
            variant="outline"
            className={difficulty === 'hard' ? 'bg-red-100 border-red-500' : ''}
            onClick={() => onDifficultyChange('hard')}>
            Hard
          </Button>
        </div>
        
        <div className="flex space-x-3">
          {!isGameStarted && (
            <Button 
              variant="default" 
              className="bg-indigo-600 hover:bg-indigo-700" 
              onClick={onStart}>
              Start Game
            </Button>
          )}
          {isGameStarted && (
            <Button 
              variant="outline" 
              className="text-indigo-700 border-indigo-300" 
              onClick={onReset}>
              Reset Game
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameControls;
