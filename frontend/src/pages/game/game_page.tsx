/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   game_page.tsx                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:12:00 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/20 02:14:34 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useRef } from "react";
import PongGame from "../../components/game/canvas";

interface PongProps {
    width?: number;
    height?: number;
}

const PongCanvas: React.FC<PongProps> = ({
    width = 800,
    height = 600
}) => {
    const gameRef = useRef<PongGame | null> (null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gameRef.current && containerRef.current) {
            try {
                const canvas = document.getElementById('Ponggame') as HTMLCanvasElement
                if(!canvas) {
                    throw new Error("couldn't init canvas")
                }
                gameRef.current = new PongGame();

                const handleResize = () => {
                    if (containerRef.current && gameRef.current) {
                        const containerHeight = containerRef.current.clientHeight
                        const containerWidth = containerRef.current.clientWidth
                        gameRef.current.resize(containerWidth,containerHeight);
                    }
                }
                window.addEventListener('resize', handleResize);
                handleResize();

                gameRef.current.start()

                return () => {
                    window.removeEventListener('resize', handleResize)
                    if (gameRef.current) {
                        gameRef.current.clean()
                        gameRef.current = null
                    }
                }
            }
            catch (error) {
                console.error('couldnt start game', error)
            }
        }
    }, [])

    return (
        <div className="PongContainer"
        ref={containerRef}
        >
            <canvas
            id="Ponggame"
            width={width}
            height={height}
              />
        </div>
    )
}

export default PongCanvas