/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   game.model.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:21 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/17 00:02:20 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// GameState model includes user ids for p1,p2 playerscores for each, status of game, winner, id of game, createdAt
// gameModel class created gameState inferface object & registers game in database & returns the game info to players
// also includes updateScore function for database after each goal -> move to service

// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";
// import { UserModel } from "./user.model";

// @Entity()
// export class GameModel {
//     @PrimaryGeneratedColumn()
//     ugid!:number;

//     @ManyToOne(() => UserModel, (user) => user.gamesAsPlayer1)
//     @JoinColumn({name: 'player1Id'})
//     player1!: UserModel;

//     @ManyToOne(() => UserModel, (user) => user.gamesAsPlayer1)
//     @JoinColumn({name: 'player1Id'})
//     player2!: UserModel;

//     @Column()
//     player1Score!: number;

//     @Column()
//     player2Score!: number;

//     @Column({nullable: true})
//     winnerId!: number;

//     @CreateDateColumn({type: 'datetime'})
//     createdAt!: Date;

//     @Column({type: 'datetime', nullable: true})
//     endedAt?: Date;

//     @Column({default: 'pending'})
//     status!: 'pending' | 'ongoing' | 'paused' | 'completed' | 'cancelled'

//     @Column({ default: false})
//     isLobbyOpen!: boolean;

//     @ManyToMany(() => UserModel)
//     @JoinTable()
//     lobbyParticipants!: UserModel[];

//     @Column({nullable: true})
//     gameAdminId?: number;
// }