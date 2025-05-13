
import React from 'react';

interface GameHeaderProps {
  flips: number;
  matches: number;
  timer: number;
  totalPairs: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({ flips, matches, timer, totalPairs }) => {
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-indigo-800">Memory Card Game</h1>
      <p className="text-center text-gray-600 mb-6">Find all matching pairs of cards!</p>
      
      <div className="grid grid-cols-3 gap-4 bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600">Flips</span>
          <span className="text-2xl font-semibold text-indigo-700">{flips}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600">Matches</span>
          <span className="text-2xl font-semibold text-indigo-700">{matches}/{totalPairs}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600">Time</span>
          <span className={`text-2xl font-semibold ${timer < 10 ? 'text-red-500' : 'text-indigo-700'}`}>
            {formatTime(timer)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
