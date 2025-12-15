import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingOverlayProps } from '../types';
import { Heart } from 'lucide-react';

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-mochi"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-chocolate mb-4"
          >
            <Heart size={48} fill="#4A3B32" />
          </motion.div>
          {/* Updated to font-display (Anton) for heavy impact */}
          <h2 className="text-chocolate text-3xl font-display uppercase tracking-widest mt-2">
            Loading...
          </h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;