
import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  id: number;
  type: string;
  flipped: boolean;
  matched: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ id, type, flipped, matched, onClick }) => {
  return (
    <motion.div
      className={`aspect-square rounded-xl cursor-pointer select-none ${
        matched ? 'opacity-60' : ''
      }`}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: flipped ? 1 : 1.05 }}
      onClick={onClick}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 ease-in-out transform ${
          flipped ? 'rotate-y-180' : ''
        } preserve-3d`}
      >
        {/* Card Back */}
        <div 
          className={`absolute w-full h-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md flex items-center justify-center backface-hidden ${
            flipped ? 'hidden' : ''
          }`}
        >
          <div className="text-3xl text-white font-bold">?</div>
        </div>
        
        {/* Card Front */}
        <div 
          className={`absolute w-full h-full rounded-xl bg-white shadow-md flex items-center justify-center backface-hidden rotate-y-180 ${
            flipped ? '' : 'hidden'
          }`}
        >
          <div className="text-5xl">{type}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
