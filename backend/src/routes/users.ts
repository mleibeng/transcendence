/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   users.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:37 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 18:18:31 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { FastifyInstance } from "fastify";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

export default async function userRoutes(fastify: FastifyInstance) {
    const userService = new UserService()
    const userController = new UserController(userService);

    fastify.register(async (fastify) => {
        fastify.addHook('preHandler', authenticateJWT)

        fastify.get('/profile', userController.getProfile.bind(userController) )
        fastify.post('/profile/update', userController.updateProfile.bind(userController))
        fastify.post('/profile/deleteAcc', userController.deleteAccount.bind(userController))
    })
}