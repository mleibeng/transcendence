/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.controller.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:08:59 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/17 00:05:33 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

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

    // maybe I should just hand out accessTokens once they actually log in...
    async register(request: FastifyRequest<{ Body: RegisterCredentials }>, reply: FastifyReply) {
        try {
            console.log("What's happening")
            const tokens = await this.authService.register(request.body);
            reply.setCookie('accessToken', tokens.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 15 * 60 * 1000
            })

            reply.setCookie('refreshTokane', tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/api/auth/refresh', //route not yet created!!!
                maxAge: 7 * 24 * 60 * 60 * 1000
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

    async login(request: FastifyRequest<{ Body: UserCredentials }>, reply: FastifyReply) {
        try {
            const result = await this.authService.login(request.body);
            if ('requiresTwoFactor' in result) {
                reply.code(200).send({
                    requiresTwoFactor: true,
                    tempToken: result.tempToken // -> send info back to frontend for requesting 2FA. -> Should maybe redirect to 2FA page / blocking pop up -> will need to send another request to verify2FA
                });
            } else {
                reply.setCookie('accessToken', result.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/',
                    maxAge: 15 * 60 * 1000
                    });
                reply.setCookie('refreshToken', result.refreshToken,  {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/api/auth/refresh',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                    });
                reply.code(200).send('Login successful');
            }
        } catch (error) {
            reply.code(400).send({ error: 'Bad Login request' });
        }
    }

    async setup2FA(request: FastifyRequest, reply: FastifyReply) {
        const userId = request.user?.userID;
        if (!userId) {
            reply.code(401).send({ error: 'Unauthorized' });
            return;
        }
        const userIdNumber = parseInt(userId, 10);

        try {
            const secret = await this.authService.generate2FASecret(userIdNumber);
            reply.code(200).send(secret);
        } catch (error) {
            reply.code(400).send({ error: 'Failed to authenticate 2FA' })
        }
    }

    async enable2FA(request: FastifyRequest<{ Body: { token: string } }>, reply: FastifyReply) {
        const userId = request.user?.userID;
        if (!userId) {
            reply.code(401).send({ error: 'Unauthorized' });
            return;
        }
        const userIdNumber = parseInt(userId, 10);

        try {
            await this.authService.enable2FA(userIdNumber, request.body.token);
            reply.code(200).send({ message: "2FA enabled" });
        } catch (error) {
            reply.code(400).send({ error: "Failed to enable 2FA" });
        }
    }

    async verify2FA(request: FastifyRequest<{ Body: { tempToken: string, token: string } }>, reply: FastifyReply) {
        try {
            const tokens = await this.authService.verify2FALogin(
                request.body.tempToken,
                request.body.token
            )

            reply.setCookie('accessToken', tokens.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/',
                maxAge: 15 * 60 * 1000
            })

            reply.setCookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/api/auth/refresh',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            reply.code(200).send('Login successful')
        } catch (error) {
            reply.code(400).send({ error: 'Bad Login request' })
        }
    }

    async logout(request: FastifyRequest, reply: FastifyReply) {
        const userId = request.user?.userID;
        if (userId) {
            const userIdNumber = parseInt(userId, 10);
            await this.authService.getUserService().updateRefreshToken(userIdNumber, null);
        }
    reply.clearCookie('accessToken', { path: '/' });
    reply.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    reply.code(200).send('Logout successful');
}

}