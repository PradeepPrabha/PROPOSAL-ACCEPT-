import { useState } from 'react';
import ProposalScreen from './components/ProposalScreen';
import AcceptanceScreen from './components/AcceptanceScreen';
import FloatingHearts from './components/FloatingHearts';

function App() {
  const [accepted, setAccepted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleYes = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setAccepted(true);
    }, 500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 animate-gradient" />

      <FloatingHearts show={true} />

      {showConfetti && <Confetti />}

      <div className="relative z-10">
        {!accepted ? (
          <ProposalScreen onYes={handleYes} />
        ) : (
          <AcceptanceScreen />
        )}
      </div>
    </div>
  );
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <span className="text-2xl">
            {['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default App;
