import { FastifyInstance } from "fastify";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

export default async function userRoutes(fastify: FastifyInstance) {
    const userService = new UserService()
    const userController = new UserController(userService);

    fastify.register(async (fastify) => {
        fastify.addHook('preHandler', authenticateJWT)

        //fastify routes here! updateProfile, getProfile, deleteAccount
    })
}