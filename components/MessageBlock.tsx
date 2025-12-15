import React from 'react';
import { motion } from 'framer-motion';
import { MessageBlockProps } from '../types';

const MessageBlock: React.FC<MessageBlockProps> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      // Added pointer-events-auto to ensure the card itself captures interactions (selection, buttons)
      // while the container is pointer-events-none
      className={`max-w-md mx-auto w-full px-4 pointer-events-auto ${className}`}
    >
      {/* 
         Refined Glassmorphism Logic:
         - bg-white/40: Increased from 30% for better contrast
         - backdrop-blur-xl: Increased blur for a frostier, premium look
         - shadow-lg: Deeper shadow
         - border-white/50: Stronger border for "cut glass" edge
      */}
      <div className={!className.includes('bg-') ? "bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/50" : ""}>
        {children}
      </div>
    </motion.div>
  );
};

export default MessageBlock;