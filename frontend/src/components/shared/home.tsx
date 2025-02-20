import React, { useEffect } from 'react';
import '@styles/style.css'
import PongCanvas from '../../pages/game/game_page';
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
    <div className="home-container">
      <PongCanvas width={800} height={600}/>
    </div>
  );
};

export default Home;