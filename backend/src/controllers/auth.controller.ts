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
            reply.setCookie('accessToken', tokens.accessToken, { // This is maybe redundant because I have already set the cookie options inside my app.register!! need to check to make sure!
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/',
                maxAge: 15 * 60 * 1000
            })

            reply.setCookie('refreshTokane', tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/api/auth/refresh', //route not yet created!!!
                maxAge: 7* 24 * 60 * 60 * 1000
            })

            reply.code(201).send('Registration successful')
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
            reply.setCookie('accessToken', tokens.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/',
                maxAge: 15 * 60 * 1000
            })

            reply.setCookie('refreshTokane', tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/api/auth/refresh',
                maxAge: 7* 24 * 60 * 60 * 1000
            })
            reply.code(200).send('Login successful')
        }
        catch (error) {
            reply.code(400).send({error: 'Bad Login request'})
        }
    }

    async logout(request: FastifyRequest, reply: FastifyReply) {
        reply.clearCookie('accessToken', {path: '/'})
        reply.clearCookie('refreshToken', {path: '/api/auth/refresh'})
        reply.code(200).send('Logout successfull')
    }

}