import { useEffect, useState } from 'react';

interface FloatingHeartsProps {
  show: boolean;
}

export default function FloatingHearts({ show }: FloatingHeartsProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [heartsCount, setHeartsCount] = useState(15);

  // Detect mobile and adjust hearts count for performance
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setHeartsCount(mobile ? 8 : 15);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!show) return null;

  const heartTypes = ['❤️', '💕', '💖', '💗'];
  const mobileHeartTypes = ['❤️', '💕']; // Simpler hearts for mobile

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(heartsCount)].map((_, i) => {
        // Different heart distribution for mobile vs desktop
        const startPosition = isMobile 
          ? Math.random() * 80 + 10 // Keep away from edges on mobile
          : Math.random() * 100;
        
        const heartSize = isMobile 
          ? `${12 + Math.random() * 16}px` // Smaller hearts on mobile
          : `${20 + Math.random() * 20}px`;
        
        const animationDuration = isMobile
          ? `${6 + Math.random() * 3}s` // Faster animation on mobile
          : `${8 + Math.random() * 4}s`;

        return (
          <div
            key={i}
            className="absolute animate-float-up"
            style={{
              left: `${startPosition}%`,
              top: '-30px',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: animationDuration,
              fontSize: heartSize,
              opacity: isMobile ? 0.2 : 0.3,
              // Reduce animation complexity on mobile
              animationTimingFunction: isMobile ? 'ease-in-out' : 'linear',
            }}
            aria-hidden="true"
          >
            {isMobile 
              ? mobileHeartTypes[Math.floor(Math.random() * mobileHeartTypes.length)]
              : heartTypes[Math.floor(Math.random() * heartTypes.length)]
            }
          </div>
        );
      })}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: ${isMobile ? 0.15 : 0.3};
          }
          90% {
            opacity: ${isMobile ? 0.1 : 0.2};
          }
          100% {
            transform: translateY(calc(-100vh - 50px)) rotate(${isMobile ? '180deg' : '360deg'}) scale(1.2);
            opacity: 0;
          }
        }
        
        .animate-float-up {
          animation: float-up linear infinite;
          will-change: transform, opacity; /* Performance optimization */
        }
      `}</style>
    </div>
  );
}