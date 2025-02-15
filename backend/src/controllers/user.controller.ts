/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.controller.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:07 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 18:01:44 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user.service";
import { UserCredentials } from "../types/auth.types";

export class UserController {
    private userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    async getProfile(request: FastifyRequest<{Body: UserCredentials}>, reply: FastifyReply) {

    }

    async updateProfile(request: FastifyRequest, reply: FastifyReply) {

    }

    async deleteAccount(request: FastifyRequest, reply: FastifyReply) {

    }
}