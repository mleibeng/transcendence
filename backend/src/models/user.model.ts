/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.model.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:58 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/17 00:02:40 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
// import { GameModel } from "./game.model";
// import { TournamentModel, TournamentStatisticsModel } from "./tournament.model";

@Entity()
export class UserModel {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({unique: true})
    email!:string

    @Column()
    password!:string

    @Column({unique: true})
    username!:string

    @Column()
    displayName!:string

    @Column({default: 'user'})
    role!:string

    @Column({nullable: true})
    twoFASecret?: string

    @Column({default: false})
    twoFAEnabled?: boolean

    @Column({nullable: true})
    refreshToken?: string

    @ManyToMany(() => UserModel)
    @JoinTable()
    friends!: UserModel[];

    // @OneToMany(() => GameModel, (game) => game.player1)
    // gamesAsPlayer1!: GameModel[];

    // @OneToMany(() => GameModel, (game) => game.player2)
    // gamesAsPlayer2!: GameModel[];

    // @ManyToMany(() => TournamentModel, (tournament) => tournament.tournamentHistoryParticipants)
    // @JoinTable()
    // tournamentHistory!: TournamentModel[];

    // @OneToMany(() => TournamentStatisticsModel, (stats) => stats.user)
    // tournamentStatistics!: TournamentStatisticsModel[];

}