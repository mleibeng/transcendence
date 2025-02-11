// Receive request from routes
// handle request/response logic
// input validation
// example: login(req,res) {
//  const {email,password} = req.body
//  await authservice.login(email,password)} -> calls auth.service.ts
// return res.send token: generateSecuretoken(user)

import { FastifyRequest, FastifyReply } from "fastify";
import { UserCredentials, RegisterCredentials } from "../types/auth.types";
import { AuthService } from "../services/auth.service";

export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService
    }

    async register(request: FastifyRequest<{ Body: RegisterCredentials }>, reply: FastifyReply) {
        try {
            const tokens = await this.authService.register(request.body);
            reply.code(201).send(tokens);
        } catch (error) {
            console.error('Registration error:', error);
            const message = error instanceof Error ? error.message : 'Registration failed';
            reply.code(400).send({
                error: message.includes('exists') ? 'User already exists' : 'Registration failed',
            });
        }
    }

    async login(request:FastifyRequest <{Body: UserCredentials}>, reply:FastifyReply ){
        try{
            const tokens = await this.authService.login(request.body);
            reply.code(200).send(tokens)
        }
        catch (error) {
            reply.code(400).send({error: 'Bad Login request'})
        }
    }
}