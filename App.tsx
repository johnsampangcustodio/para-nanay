import React, { useState, useRef, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';
import Confetti from 'react-confetti';
import { ChevronDown } from 'lucide-react';

import MessageBlock from './components/MessageBlock';
import LoadingOverlay from './components/LoadingOverlay';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    // Set initial size
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Parallax Logic for text container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- 3D Scroll Animations ---
  // REMOVED: Scale, Rotate, and Y translations on the Spline container.
  // The user requested the avatar size to stay fixed and stable (no zooming/shrinking).
  
  // Opacity remains locked to 1 (Always clear)
  const splineOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  
  // Fade out the "Scroll Down" indicator
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // --- Message Block Parallax ---
  // Apply a subtle downward shift (positive Y) as the user scrolls down.
  // This counteracts the upward scroll movement slightly, creating a "slow float" effect.
  const yRange1 = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const yRange2 = useTransform(scrollYProgress, [0.2, 0.8], [0, 100]);
  const yRange3 = useTransform(scrollYProgress, [0.5, 1], [0, 80]);

  const handleSplineLoad = () => {
    // Artificial delay to ensure smoother transition if it loads instantly
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const triggerCelebration = () => {
    setShowConfetti(true);
  };

  return (
    <main className="relative bg-mochi min-h-screen text-chocolate font-sans selection:bg-blush selection:text-chocolate overflow-x-hidden">
      
      {/* Loading State */}
      <LoadingOverlay isLoading={isLoading} />

      {/* Confetti Overlay */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti 
            width={windowSize.width} 
            height={windowSize.height} 
            numberOfPieces={200}
            gravity={0.15}
            colors={['#FFB7C5', '#FFFFFF', '#4A3B32', '#FFD1DC', '#E6C1B1']}
          />
        </div>
      )}

      {/* --- LAYER 0: The Fixed 3D Background --- */}
      {/* 
          pointer-events-auto allows the user to rotate the model manually.
          We removed all motion styles (scale, y, rotate) to keep it perfectly stable during scroll.
      */}
      <div className="fixed inset-0 z-0 h-[100dvh] w-full flex items-center justify-center">
        <motion.div 
          style={{ 
            opacity: splineOpacity
          }} 
          className="w-full h-full relative"
        >
          {/* 
            Note: In a real environment, ensure the Spline URL is whitelisted.
            Using the provided URL from the prompt.
          */}
           <Spline
             scene="https://prod.spline.design/Q4G9v6Lo2CbxlsSm/scene.splinecode" 
             onLoad={handleSplineLoad}
             className="w-full h-full"
           />
           
           {/* Watermark Cover - Hides the Spline logo in bottom right. Size increased to w-48 h-24. */}
           <div className="absolute bottom-0 right-0 w-48 h-24 bg-mochi z-50 pointer-events-auto" />
        </motion.div>
      </div>

      {/* --- LAYER 1: The Scrollable Content --- */}
      {/* Added pointer-events-none to container so clicks pass through to the 3D model in empty spaces */}
      <div ref={containerRef} className="relative z-10 w-full min-h-[250vh] pointer-events-none">
        
        {/* HERO SECTION */}
        <section className="h-[100dvh] w-full flex flex-col items-center justify-end pb-12 relative">
          {!isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center z-20 px-4 pointer-events-auto"
            >
              {/* Updated to use font-display (Anton) */}
              <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tight mb-2 text-chocolate leading-none">
                Happy<br/>Birthday<br/>Nanay
              </h1>
              <p className="font-serif italic text-lg opacity-80 mb-8 mt-4">
                Move the rabbits! Swipe down to make them smaller, and up to make them bigger!
              </p>
            </motion.div>
          )}

          {/* Scroll Indicator */}
          {!isLoading && (
            <motion.div 
              style={{ opacity: scrollIndicatorOpacity }}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute bottom-8"
            >
              <ChevronDown size={32} className="text-chocolate opacity-60" />
            </motion.div>
          )}
        </section>

        {/* SCROLLY-TELLING SECTION */}
        <div className="pb-32 px-4 flex flex-col items-center w-full">
          
          {/* Card 1 */}
          <motion.div style={{ y: yRange1 }} className="w-full pointer-events-none">
            <MessageBlock className="mt-[10vh]">
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight mb-4">Nanay,</h2>
              <p className="text-lg md:text-xl leading-relaxed font-serif text-chocolate/90">
                Happy Birthday!<br/>
                I appreciate everything you've sacrificed for the family.<br/>
                Everyday I am grateful that you were willing to sacrifice
                your passions to raise and build our family. <br/>I'm grateful for your
                kindness; that through all the past drama and what might come, you always
                show patience. <br/> I'm excited for many more years of happiness and love.
              </p>
            </MessageBlock>
          </motion.div>

          {/* Spacer */}
          <div className="h-[30vh] md:h-[40vh]" />

          {/* Card 2 */}
          <motion.div style={{ y: yRange2 }} className="w-full pointer-events-none">
            <MessageBlock>
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight mb-4">Thank you...</h2>
              <p className="text-lg md:text-xl leading-relaxed font-serif text-chocolate/90">
                For always supporting me. For being my biggest role model.<br/>
                For always being someone I can look up to. For always trying<br/>
                to understand. And for teaching me to always do more, whether<br/>
                it's just trying a little bit harder every day or trying a bit harder<br/>
                to take care of myself every day. Salamat po!
              </p>
            </MessageBlock>
          </motion.div>

          {/* Spacer */}
          <div className="h-[30vh] md:h-[40vh]" />

          {/* Finale Card - Updated styling for stronger glassmorphism and interactivity */}
          <motion.div style={{ y: yRange3 }} className="w-full pointer-events-none">
            <MessageBlock className="text-center bg-white/50 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/60 pointer-events-auto">
              {/* Removed Sparkles Icon */}
              <p className="text-4xl md:text-5xl font-display uppercase tracking-tight mb-8">Love, Phillip!</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerCelebration}
                className="bg-chocolate text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all inline-block mx-auto font-sans"
              >
                <span>Maligayang Bate!</span>
                {/* Removed Sparkles Icon */}
              </motion.button>
            </MessageBlock>
          </motion.div>

        </div>
      </div>
    </main>
  );
}