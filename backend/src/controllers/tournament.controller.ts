/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tournament.controller.ts                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:04 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 18:52:03 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { TournamentService } from "../services/tournament.service";

// create Tournament class -> join functionality


export class TournamentController {
    private tournamentService: TournamentService

    constructor(tournamentService: TournamentService){
        this.tournamentService = tournamentService
    }

    async createTournamentLobby() {

    } // also needs to create code to instance for invites -> hand to user controller -> reflect function in userController to accept/send to more players for invitation

    async playerStateManagement() {

    } // -> needs access management for admin player that created the lobby for kicking/inviting more players, giving other players admin rights for the instance etc...

    async updateTournamentResults() {

    } // updateTournamentResults -> fetches gameResults to reflect win/losses, remaining playercount, playermatches coming up etc..

    async saveTournamentResults() {

    } // save results in database after finished tournament


}