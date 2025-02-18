import React from 'react';
import '@styles/style.css'
import PongGame from '../game/canvas';
// will be modified for game canvas and rando matchmaking without log in

// document.addEventListener('DOMContentLoaded', () => {
//   const PongGame = new PongGame();
// })

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <canvas id="Ponggame" width="800" height="600"/>
    </div>
  );
};

export default Home;