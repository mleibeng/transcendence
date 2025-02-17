/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tournament.model.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:24 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/17 00:02:36 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// creates interface for tournament, tournament player, tournament match
// & class tournament model for UUID of each tournament including registered players
// & add players/fetch/get players to tournament model -> also register tournament in database

// import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { UserModel } from "./user.model";


// @Entity()
// export class TournamentModel {
//     @PrimaryGeneratedColumn()
//     utid!:number;

//     @CreateDateColumn({type: 'datetime'})
//     createdAt!: Date;

//     @Column({type: 'datetime', nullable: true})
//     startedAt?: Date;

//     @Column({type: 'datetime', nullable: true})
//     endedAt?: Date;

//     @Column({default: 'pending'})
//     status!: 'pending' | 'stopped' | 'ongoing' | 'completed' | 'cancelled'

//     @Column({nullable: true})
//     tournamentAdminId?: number;

//     @ManyToMany(() => UserModel)
//     @JoinTable()
//     participants!: UserModel[];

//     @OneToMany(() => TournamentRoundModel, (round) => round.tournament)
//     rounds!: TournamentRoundModel[];

//     @Column({nullable: true})
//     winnerId?: number

//     @ManyToOne(() => UserModel)
//     @JoinColumn({ name: 'winnerId'})
//     winner!: UserModel

//     @Column({default: 4})
//     minPlayers!: number;

//     @Column({default: 16})
//     maxPlayers!: number;

//     @Column({nullable:true})
//     description?: string;

//     @ManyToMany(() => UserModel, (user) => user.tournamentHistory)
//     @JoinTable()
//     tournamentHistoryParticipants!: UserModel[];

//     @OneToMany(() => TournamentStatisticsModel, (stats) => stats.tournament)
//     statistics!: TournamentStatisticsModel[];

//     @OneToMany(() => TournamentChatModel, (message) => message.tournament)
//     chatMessages!: TournamentChatModel[];
// }

// @Entity()
// export class TournamentRoundModel {
//     @PrimaryGeneratedColumn()
//     urid!: number;

//     @Column()
//     roundNumber!: number;

//     @ManyToOne(() => TournamentModel, (tournament) => tournament.rounds)
//     @JoinColumn({ name: 'tournamentId'})
//     tournament!: TournamentModel;

//     @OneToMany(() => TournamentMatchModel, (match) => match.round)
//     matches!: TournamentMatchModel[]
// }

// @Entity()
// export class TournamentMatchModel {
//     @PrimaryGeneratedColumn()
//     umid!: number;

//     @ManyToOne(() => TournamentRoundModel, (round) => round.matches)
//     @JoinColumn({name: 'roundId'})
//     round!: TournamentModel;

//     @ManyToOne(() => UserModel)
//     @JoinColumn({name: 'player1Id'})
//     player1!: UserModel;

//     @ManyToOne(() => UserModel)
//     @JoinColumn({name: 'player2Id'})
//     player2!: UserModel;

//     @Column({nullable: true})
//     winnerId?: number;

//     @ManyToOne(() => UserModel)
//     @JoinColumn({name: 'winnerId'})
//     winner!: UserModel

//     @Column({default: 'pending'})
//     status!: 'pending' | 'stopped' | 'ongoing' | 'completed' | 'cancelled'

//     @Column({type: 'datetime', nullable: true})
//     startedAt?: Date

//     @Column({type: 'datetime', nullable: true})
//     endedAt?: Date

//     @Column({nullable: true})
//     player1Score?: number

//     @Column({nullable: true})
//     player2Score?: number
// }

// @Entity()
// export class TournamentChatModel {
//     @PrimaryGeneratedColumn()
//     ucid!: number;

//     @ManyToOne(() => TournamentModel, (tournament) => tournament.statistics)
//     @JoinColumn({name: 'tournamentId'})
//     tournament!: TournamentModel;

//     @ManyToOne(() => UserModel)
//     @JoinColumn({name: 'userId'})
//     user!: UserModel;

//     @Column()
//     message!: string;

//     @CreateDateColumn({ type: 'datetime'})
//     sentAt!: Date
// }

// @Entity()
// export class TournamentStatisticsModel {
//     @PrimaryGeneratedColumn()
//     usid!: number;

//     @ManyToOne(() => TournamentModel, (tournament) => tournament.statistics)
//     @JoinColumn({name: 'tournamentId'})
//     tournament!: TournamentModel;

//     @ManyToOne(() => UserModel)
//     @JoinColumn({name: 'userId'})
//     user!: UserModel;

//     @Column({ default: 0})
//     wins!: number;

//     @Column({ default: 0})
//     losses!: number;

//     @Column({default: 0})
//     totalMatchesPlayed!: number;

//     @Column({default: 0})
//     totalScore!: number;

//     @Column({type: 'float', default: 0})
//     winRate!: number;
// }