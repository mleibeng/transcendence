/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:48 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/16 07:40:22 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { AppDataSource } from "../data-source";
import { RegisterCredentials } from "../types/auth.types";
import { UserModel } from '../models/user.model'

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

    async findEmailAcc(email: string) {
        return await this.userRepo.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'role', 'twoFAEnabled', 'twoFASecret']
        });
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

    async update2FASecret(userId: number, secret: string): Promise<UserModel> {
        await this.userRepo.update(userId, { twoFASecret: secret });
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user) throw new Error("User not found");
        return user;
    }

    async update2FAEnabled(userId: number, enabled: boolean): Promise<UserModel> {
        await this.userRepo.update(userId, { twoFAEnabled: enabled });
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user) throw new Error("User not found");
        return user;
    }

    async updateRefreshToken(userId: number, refreshToken: string | null): Promise<void> {
        if (refreshToken === null) {
            await this.userRepo
                .createQueryBuilder()
                .update(UserModel)
                .set({ refreshToken: () => 'NULL' })
                .where('id = :id', { id: userId })
                .execute();
        } else {
            await this.userRepo.update(userId, { refreshToken });
        }
    }
}
