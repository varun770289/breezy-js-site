
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

interface WinModalProps {
  flips: number;
  timeElapsed: number;
  onPlayAgain: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ flips, timeElapsed, onPlayAgain }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    // Add a slight delay before showing the modal for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Launch confetti
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
      
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full transform transition-all" 
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">🎉 Congratulations! 🎉</h2>
          <p className="text-lg text-gray-700 mb-6">You've matched all the cards!</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="font-medium">Total Flips:</span>
              <span className="text-indigo-600 font-bold">{flips}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="font-medium">Time Elapsed:</span>
              <span className="text-indigo-600 font-bold">{formatTime(timeElapsed)}</span>
            </div>
          </div>
          
          <Button 
            onClick={onPlayAgain} 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-2 rounded-full text-lg"
          >
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WinModal;
