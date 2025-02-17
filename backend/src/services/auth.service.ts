/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:40 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/17 00:05:50 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Contains business logic
// handle complex operations
// example: async function login(email, password) {
// user = await userModel.findEmail(email) -> hand over to modelscheck in database
// if !error of any type -> throw error
// otherwise return correct user }

import { UserCredentials, RegisterCredentials, JWTPayload, AuthTokens, TwoFactorInfo } from "../types/auth.types";
import { UserModel } from "../models/user.model";
import { hashPW, verifyPW, generateJWT } from "../utils/security";
import { UserService } from "./user.service";
import speakeasy, { otpauthURL } from 'speakeasy'
import QRcode from 'qrcode'
import jwt, { decode } from 'jsonwebtoken'

export class AuthService {
    constructor(private userService: UserService) {}

    getUserService(): UserService {
        return this.userService;
    }

    async register(credentials:RegisterCredentials): Promise<AuthTokens> {
        console.log("What's happening service??")
        const hashedPW = await hashPW(credentials.password)
        const user = await this.userService.createUser({
            ...credentials,
            password: hashedPW
        })
        return this.generateTokens(user)
    }

    async login(credentials:UserCredentials): Promise<AuthTokens | { requiresTwoFactor: true, tempToken: string}> {
        const user = await this.userService.findEmailAcc(credentials.email)
        if (!user || !await verifyPW(credentials.password, user.password)) {
            throw new Error('Invalid login data')
        }

        if (user.twoFAEnabled) {
            const tempToken = jwt.sign(
                { userId: user.id, type: '2FA-pending'},
                process.env.JWT_SECRET!,
                {expiresIn: '5m'}
            )

            return {
                requiresTwoFactor: true,
                tempToken,
            }
        }

        return this.generateTokens(user);
    }

    async verify2FALogin(tempToken:string, twoFactorToken:string): Promise<AuthTokens> {

        const decoded = jwt.verify(tempToken, process.env.JWT_SECRET!) as {userId: number, type: string} // need to adjust JWTPayload these properties dont exist
        if (decoded.type !== '2FA-pending') {
            throw new Error('Invalid token type');
        }

        const isValid = await this.verify2FAToken(decoded.userId, twoFactorToken)
        if (!isValid) {
            throw new Error('Invalid 2FA token')
        }

        const user = await this.userService.findId(decoded.userId)
        if (!user) {
            throw new Error("User not found")
        }
        return this.generateTokens(user);
    }

    async generate2FASecret(userId:number): Promise<TwoFactorInfo> {
        const secret = speakeasy.generateSecret({
            name: `PongGame:${userId.toString()}`,
        })

        if (!secret.otpauth_url) {
            throw new Error('Failed to create OTP URL')
        }

        const otpauthUrl = secret.otpauth_url
        const qrCodeUrl = await QRcode.toDataURL(otpauthUrl)

        await this.userService.update2FASecret(userId, secret.base32)

        return {
            secret: secret.base32,
            otpauthUrl,
            qrCodeUrl,
        };
    }

    async verify2FAToken(userId:number , token:string): Promise<boolean> {

        const user = await this.userService.findId(userId)

        if (!user || !user.twoFASecret) {
            throw new Error('User not found or registered with 2FA')
        }

        return speakeasy.totp.verify({
            secret: user.twoFASecret,
            encoding: 'base32',
            token,
        })
    }

    async enable2FA(userId: number, token: string): Promise<void> {

        const isValid = await this.verify2FAToken(userId, token)
        if(!isValid) {
            throw new Error("Invalid 2FA")
        }

        await this.userService.update2FAEnabled(userId, true)
    }

    private generateTokens(user: UserModel): AuthTokens {
        const payload: JWTPayload = {
            userID: user.id.toString(),
            email: user.email,
            role: user.role
        }

        const accessToken = generateJWT(payload)
        const refreshToken = this.generateRefreshToken(user.id)

        this.userService.updateRefreshToken(user.id, refreshToken);

        return {
            accessToken,
            refreshToken
        }
    }

    private generateRefreshToken(userId: number): string {
        const secret = process.env.REFRESH_TOKEN_SECRET
        if (!secret) {
            throw new Error('REFRESH_TOKEN_SECRET not set')
        }
        return jwt.sign (
            { userId },
            secret,
            { expiresIn: '7d'}
        )
    }
}