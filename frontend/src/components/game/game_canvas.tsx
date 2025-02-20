/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   game_canvas.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:12:00 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/20 06:58:52 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useRef } from "react";
import PongGame from "./game_logic";

interface PongProps {
  width?: number;
  height?: number;
}

const PongCanvas: React.FC<PongProps> = ({ width = 800, height = 600 }) => {
  const gameRef = useRef<PongGame | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (containerRef.current && canvasRef.current && !gameRef.current) {
      try {
        gameRef.current = new PongGame();

        const handleResize = () => {
          if (!containerRef.current || !gameRef.current || !canvasRef.current) return;

          const containerWidth = containerRef.current.clientWidth;
          const containerHeight = containerRef.current.clientHeight;

          let gameWidth, gameHeight;

          if (containerWidth / containerHeight > 4 / 3) {
            gameHeight = containerHeight;
            gameWidth = containerHeight * (4 / 3);
          } else {
            gameWidth = containerWidth;
            gameHeight = containerWidth * (3 / 4);
          }

          canvasRef.current.width = gameWidth;
          canvasRef.current.height = gameHeight;

          canvasRef.current.style.width = `${gameWidth}px`;
          canvasRef.current.style.height = `${gameHeight}px`;

          gameRef.current.resize(gameWidth, gameHeight);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        gameRef.current.render(false)

        return () => {
          window.removeEventListener('resize', handleResize);
          if (gameRef.current) {
            gameRef.current.clean();
            gameRef.current = null;
          }
        };
      } catch (error) {
        console.error('Could not start game', error);
      }
    }
  }, []);

  return (
    <div className="w-full h-full max-w-[800px] max-h-[600px] aspect-[4/3] relative mx-auto" ref={containerRef}>
      <canvas
        id="Ponggame"
        className="w-full h-full bg-black"
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
};

export default PongCanvas;