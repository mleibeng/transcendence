/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:48 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 17:09:48 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { AppDataSource } from "../data-source";
import { RegisterCredentials } from "../types/auth.types";
import { UserModel } from '../types/user.types'

export class UserService {
    private userRepo = AppDataSource.getRepository(UserModel)

    async createUser(userData: RegisterCredentials & {password:string}) {
        const existingUser = await this.userRepo.findOne({
            where: [
                {email: userData.email},
                {username: userData.username}
            ]
        })

        if (existingUser) {
            throw new Error('User already exists')
        }

        const user = this.userRepo.create(userData)
        return await this.userRepo.save(user)

    }

    async findEmailAcc(email:string) {
        return await this.userRepo.findOne({
            where: {email},
            select: ['id', 'email', 'password', 'role']
        })
    }

    async findId(id:number) {
        return await this.userRepo.findOneBy({id})
    }

    async updateUser(user: UserModel) {
        return await this.userRepo.save(user)
    }

    async removeUser(userData: RegisterCredentials) {
        const existingUser =  await this.userRepo.findOne({
            where: [
                {email: userData.email},
                {username: userData.username}
            ]
        })

        if (existingUser) {
            return await this.userRepo.delete(existingUser)
        }
    }
}
