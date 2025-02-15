/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   game.model.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:21 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 17:09:22 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// GameState model includes user ids for p1,p2 playerscores for each, status of game, winner, position of paddle, id of game, ball vector xy, createdAt
// gameModel class created gameState inferface object & registers game in database & returns the game info to players
// also includes updateScore function for database after each goal