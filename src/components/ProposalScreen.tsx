import { useState, useEffect } from 'react';

interface ProposalScreenProps {
  onYes: () => void;
}

export default function ProposalScreen({ onYes }: ProposalScreenProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonMoving, setIsNoButtonMoving] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Create floating hearts
  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setHearts(newHearts);
  }, []);

  const moveNoButton = () => {
    setIsNoButtonMoving(true);

    const maxX = window.innerWidth - 120; // Smaller for mobile
    const maxY = window.innerHeight - 50;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoButtonPosition({ x: newX, y: newY });
  };

  useEffect(() => {
    if (isNoButtonMoving) {
      const timeout = setTimeout(() => {
        setIsNoButtonMoving(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [noButtonPosition, isNoButtonMoving]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-pink-50 to-rose-50 overflow-hidden relative">
      {/* Floating hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-2xl md:text-3xl animate-float"
          style={{
            left: `${heart.x}vw`,
            top: `${heart.y}vh`,
            animationDelay: `${heart.id * 0.5}s`,
            opacity: 0.7,
          }}
        >
          ❤️
        </div>
      ))}

      {/* Animated sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-300 rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10 max-w-2xl">
        {/* Decorative elements */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">
          💌
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mb-6 md:mb-8 animate-pulse-slow leading-tight">
          Will You Be My Forever? 🌹
        </h1>

        <p className="text-lg md:text-xl text-rose-500 mb-8 md:mb-12 font-medium">
          My heart has been waiting for this moment...
        </p>

        <div className="relative mt-8 md:mt-12 h-24 md:h-32">
          {/* Yes Button - Smaller and more elegant */}
          <button
            onClick={onYes}
            className="absolute left-1/2 -translate-x-28 md:-translate-x-32 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-glow border-2 border-white hover:border-rose-200 min-w-[120px] md:min-w-[140px]"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-xl">💖</span>
              YES
            </span>
          </button>

          {/* No Button - Smaller and playful */}
          <button
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            onTouchStart={moveNoButton}
            className="absolute px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gray-300 to-gray-400 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg transition-all duration-500 ease-out hover:bg-gray-400 active:scale-95 border-2 border-white min-w-[120px] md:min-w-[140px]"
            style={{
              left: isNoButtonMoving ? `${noButtonPosition.x}px` : 'calc(50% + 24px)',
              top: isNoButtonMoving ? `${noButtonPosition.y}px` : '0',
              position: isNoButtonMoving ? 'fixed' : 'absolute',
              transform: isNoButtonMoving ? 'none' : 'translateY(0)',
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <span>😢</span>
              NO
            </span>
          </button>
        </div>

        {/* Romantic message */}
        <div className="mt-20 md:mt-24 p-4 md:p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg max-w-md mx-auto animate-fade-in">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            "Every love story is beautiful, but ours is my favorite. 
            Say yes and let's write our forever together. 💕"
          </p>
          <div className="mt-4 text-xs md:text-sm text-rose-400 font-medium">
            ❤️ Choose with your heart ❤️
          </div>
        </div>

        {/* Cute footer */}
        <div className="mt-8 flex items-center justify-center gap-4 text-rose-300">
          <div className="text-sm">Made with</div>
          <div className="animate-heartbeat text-xl">💝</div>
          <div className="text-sm">for you</div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}