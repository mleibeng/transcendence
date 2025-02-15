/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   game.controller.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:02 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 18:29:56 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { GameService } from "../services/game.service"


export class GameController {
    private gameService: GameService

    constructor(gameService: GameService) {
        this.gameService = gameService
    }

    async createGameLobby() {

    }

    async matchmakeGame() {

    } // -> matchmake with other players in matchmake state, calls createGameRoom with websocket implementation

    async challengeFriend() {

    } // -> create popup + link in chat for player on friendlist or by UUID/username of player

    async saveGameResults() {

    } // -> save match in matchHistory in case of logged in player profile. -> move to game model probably.

    async updateGamePoints() {

    } // -> update in game points actively during match -> move to websocket probably

    async playAgain() {

    } // -> move to new lobby with previous players if agreed upon by vote

}