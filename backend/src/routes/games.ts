/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   games.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:32 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 19:06:05 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


// Player connects -> Authenticates with JWT -> Joins Game Lobby

import { FastifyInstance } from "fastify";
import { GameService } from "../services/game.service";
import { GameController } from "../controllers/game.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

// Find Match -> Wait for opponent -> Create Game Room -> Both players ready -> Start Game

// 60 times per second:
// 1. Process player inputs
// 2. Update ball position
// 3. Check collisions
// 4. Update scores if needed
// 5. Broadcast new state to both players

export default async function gameController(fastify: FastifyInstance) {

    const gameService = new GameService();
    const gameController = new GameController(gameService)

    fastify.register(async (fastify) => {
        fastify.addHook('preHandler', authenticateJWT)

        fastify.get('/game', gameController.createGameLobby.bind(gameController)) // -> all in wss
        fastify.post('/game/invite', gameController.challengeFriend.bind(gameController)) //maybe only put
        fastify.post('/game/matchmake', gameController.matchmakeGame.bind(gameController))
        fastify.post('/game/playAgain', gameController.playAgain.bind(gameController))
    })

}