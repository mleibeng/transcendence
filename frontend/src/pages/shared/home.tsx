import React, { useEffect } from 'react';
import '@styles/style.css'
import PongCanvas from '../game/game_page';
// will be modified for game canvas and rando matchmaking without log in

// document.addEventListener('DOMContentLoaded', () => {
//   const PongGame = new PongGame();
// })

const Home: React.FC = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] p-4 bg-gray-100 overflow-hidden">
      <h1 className="mb-4 text-center text-3xl font-semibold font-mono">Welcome to Local Pong!</h1>
      <PongCanvas />
    </div>
  );
};

export default Home;