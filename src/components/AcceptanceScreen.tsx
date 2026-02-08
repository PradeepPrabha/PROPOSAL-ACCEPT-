import { useEffect, useState, useRef } from 'react';

// ✅ Import 12 photos directly
import photo1 from '../assets/photoes/1.jpg';
import photo2 from '../assets/photoes/2.jpg';
import photo3 from '../assets/photoes/3.jpg';
import photo4 from '../assets/photoes/4.jpg';
import photo5 from '../assets/photoes/5.jpg';
import photo6 from '../assets/photoes/6.jpg';
import photo7 from '../assets/photoes/7.jpg';
import photo8 from '../assets/photoes/8.jpg';
import photo9 from '../assets/photoes/9.jpg';
import photo10 from '../assets/photoes/10.jpg';
import photo11 from '../assets/photoes/11.jpg';
import photo12 from '../assets/photoes/12.jpg';

// ✅ Store them in array
const photos = [
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
  photo6,
  photo7,
  photo8,
  photo9,
  photo10,
  photo11,
  photo12,
];

export default function AcceptanceScreen() {
  const [showPhotos, setShowPhotos] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [photoPositions, setPhotoPositions] = useState<Array<{x: number, y: number, scale: number, rotation: number}>>([]);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if mobile on initial render
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Initialize photo positions (all start at center)
    const initialPositions = photos.map(() => ({
      x: 50,
      y: 50,
      scale: isMobile ? 0.4 : 0.5,
      rotation: 0
    }));
    setPhotoPositions(initialPositions);

    // Staggered animation sequence
    const photoTimer = setTimeout(() => {
      setShowPhotos(true);
      
      // After showing photos, animate them to splash positions
      setTimeout(() => {
        splashPhotosToPositions();
      }, 300);
      
    }, 500);

    const heartTimer = setTimeout(() => setShowHearts(true), 1200);
    const messageTimer = setTimeout(() => setShowMessage(true), 2000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(photoTimer);
      clearTimeout(heartTimer);
      clearTimeout(messageTimer);
    };
  }, [isMobile]);

  const splashPhotosToPositions = () => {
    const heartPositions = calculateHeartPositions(photos.length, isMobile);
    
    // Create new positions with animation targets
    const newPositions = heartPositions.map((pos, index) => {
      // Add some randomness to make it more natural
      const rotation = Math.random() * (isMobile ? 10 : 15) - (isMobile ? 5 : 7.5);
      const scale = 1;
      
      return {
        x: pos.x,
        y: pos.y,
        scale: scale,
        rotation: rotation
      };
    });
    
    // Animate each photo with a delay
    newPositions.forEach((pos, index) => {
      setTimeout(() => {
        setPhotoPositions(prev => {
          const updated = [...prev];
          updated[index] = pos;
          return updated;
        });
      }, index * (isMobile ? 220 : 180)); // Slower on mobile
    });
  };

  // Generate floating hearts
  const generateHearts = () => {
    const hearts = [];
    const heartCount = isMobile ? 8 : 12;
    
    for (let i = 0; i < heartCount; i++) {
      const size = isMobile ? Math.random() * 20 + 10 : Math.random() * 25 + 15;
      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 15;
      const delay = Math.random() * 5;
      
      hearts.push(
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${left}%`,
            bottom: '-50px',
            fontSize: `${size}px`,
            animation: `floatUp ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
            opacity: 0.4,
            zIndex: 0,
          }}
        >
          ❤️
        </div>
      );
    }
    return hearts;
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-center px-3 sm:px-4 py-2 sm:py-4 md:py-8 relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-pink-200 to-transparent rounded-full blur-xl sm:blur-2xl md:blur-3xl opacity-20 sm:opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-tr from-purple-200 to-transparent rounded-full blur-xl sm:blur-2xl md:blur-3xl opacity-20 sm:opacity-30"></div>
        {showHearts && generateHearts()}
      </div>

      <div className="relative w-full max-w-6xl lg:max-w-7xl z-10 flex flex-col items-center justify-center flex-1">
        {showMessage && (
           <div className="inline-block bg-gradient-to-r from-pink-100/70 to-purple-100/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 mb-2 sm:mb-3 border border-white/50 shadow-lg">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-purple-700 mb-1 sm:mb-2 tracking-tight leading-tight sm:leading-tight">
              Thank You For Accepting
              <span className="inline-block ml-2 sm:ml-3 animate-pulse">❤️</span>
            </h1>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-purple-700/90 font-medium mt-1 sm:mt-2 text-center">
              I Love You Forever <span className="text-pink-600 font-bold">My Dear Magalee</span>
              <span className="inline-block ml-1 sm:ml-2 animate-float">💕</span>
            </p>
          </div>
    
        )}

        <div className="relative w-full h-[55vh] xs:h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] min-h-[350px] xs:min-h-[400px] sm:min-h-[450px] md:min-h-[500px] max-h-[600px] sm:max-h-[700px] md:max-h-[750px] flex items-center justify-center">
          {/* Center love symbol - Responsive */}
          <div className="absolute z-0">
            <div className={`${isMobile ? 'w-12 h-12' : 'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24'} bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full ${isMobile ? 'border-3' : 'border-4 sm:border-6'} border-white/30 shadow-lg sm:shadow-xl md:shadow-2xl backdrop-blur-sm flex items-center justify-center`}>
              <div className={`${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl md:text-4xl'} animate-heartbeat`}>❤️</div>
            </div>
          </div>

          {/* Render all photos - Responsive sizes */}
          {showPhotos && photos.map((photo, index) => {
            const position = photoPositions[index];
            if (!position) return null;

            const isAtFinalPosition = position.x !== 50 || position.y !== 50;
            
            // Responsive photo sizes with more granular control
            let photoSize = '';
            if (isAtFinalPosition) {
              if (isMobile) {
                photoSize = 'w-16 h-16 xs:w-18 xs:h-18 sm:w-22 sm:h-22';
              } else {
                photoSize = 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40';
              }
            } else {
              photoSize = isMobile ? 'w-14 h-14' : 'w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22';
            }
            
            return (
              <div
                key={index}
                className="absolute z-10"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: `translate(-50%, -50%) scale(${position.scale}) rotate(${position.rotation}deg)`,
                  transition: `all ${isMobile ? '1.8s' : '1.6s'} cubic-bezier(0.34, 1.56, 0.64, 1)`,
                  opacity: isAtFinalPosition ? 1 : 0.8,
                  animation: isAtFinalPosition ? `gentle-float ${isMobile ? '6s' : '5s'} ease-in-out infinite` : 'none',
                  animationDelay: `${index * (isMobile ? 0.3 : 0.25)}s`,
                  zIndex: isAtFinalPosition ? 20 : 10,
                }}
              >
                <div className="relative group">
                  {/* Photo glow effect - responsive */}
                  {isAtFinalPosition && (
                    <div className={`absolute ${
                      isMobile ? '-inset-1.5' : '-inset-2 sm:-inset-2.5 md:-inset-3'
                    } bg-gradient-to-r from-pink-400/20 to-purple-400/20 ${
                      isMobile ? 'rounded-md' : 'rounded-lg sm:rounded-xl md:rounded-2xl'
                    } ${
                      isMobile ? 'blur-sm' : 'blur-md sm:blur-lg'
                    } group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-60`}></div>
                  )}
                  
                  {/* Photo - Clean without number */}
                  <img
                    src={photo}
                    alt={`Memory ${index + 1}`}
                    className={`relative ${photoSize} object-cover ${
                      isMobile ? 'rounded-md' : 'rounded-lg sm:rounded-lg md:rounded-xl'
                    } ${
                      isMobile ? 'shadow-md' : 'shadow-lg sm:shadow-xl'
                    } hover:scale-110 sm:hover:scale-115 md:hover:scale-125 hover:rotate-2 md:hover:rotate-3 transition-all duration-300 ${
                      isMobile ? 'border-2' : 'border-3 sm:border-3 md:border-4'
                    } border-white/90 cursor-pointer`}
                    style={{
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive message at bottom - responsive */}
        {showMessage && (
          <div className="text-center mt-3 sm:mt-4 md:mt-6 lg:mt-8 px-2 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600/90 font-light italic max-w-xs xs:max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 bg-white/40 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl border border-white/40 shadow">
              Each photo holds a special memory that led us here today. 
              <span className="block mt-0.5 sm:mt-1 md:mt-1.5 text-pink-600 font-medium">
                Our journey continues with endless love... 💫
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Modified for better mobile responsiveness
function calculateHeartPositions(count: number, isMobile: boolean = false): Array<{ x: number; y: number }> {
  const positions: Array<{ x: number; y: number }> = [];
  
  // Use smaller scale on mobile
  const scale = isMobile ? 7 : 8;
  const offsetX = 50;
  const offsetY = isMobile ? 48 : 50; // Slightly higher on mobile to accommodate text

  for (let i = 0; i < count; i++) {
    const t = (i / count) * 2 * Math.PI;

    // Heart equation
    const x = scale * (16 * Math.pow(Math.sin(t), 3));
    const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    // Constrain positions based on screen size
    const minPosition = isMobile ? 20 : 18;
    const maxPosition = isMobile ? 80 : 82;
    
    const constrainedX = Math.max(minPosition, Math.min(maxPosition, offsetX + x));
    const constrainedY = Math.max(minPosition, Math.min(maxPosition, offsetY + y));

    positions.push({
      x: constrainedX,
      y: constrainedY,
    });
  }

  return positions;
}