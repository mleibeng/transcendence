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