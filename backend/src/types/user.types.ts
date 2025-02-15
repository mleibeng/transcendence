/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.types.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:58 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 17:09:59 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}