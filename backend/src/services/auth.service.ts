// Contains business logic
// handle complex operations
// example: async function login(email, password) {
// user = await userModel.findEmail(email) -> hand over to modelscheck in database
// if !error of any type -> throw error
// otherwise return correct user }

import { UserCredentials, RegisterCredentials, JWTPayload, AuthTokens } from "../types/auth.types";
import { UserModel } from "../types/user.types";
import { hashPW, verifyPW, generateJWT } from "../utils/security";
import { UserService } from "./user.service";
import jwt from 'jsonwebtoken'

export class AuthService {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async register(credentials:RegisterCredentials): Promise<AuthTokens> {
        const hashedPW = await hashPW(credentials.password)
        const user = await this.userService.createUser({
            ...credentials,
            password: hashedPW
        })
        return this.generateTokens(user)
    }

    async login(credentials:UserCredentials): Promise<AuthTokens>{
        const user = await this.userService.findEmailAcc(credentials.email)
        if (!user || !await verifyPW(credentials.password, user.password)) {
            throw new Error('Invalid login data')
        }
        return this.generateTokens(user);
    }

    private generateTokens(user: UserModel): AuthTokens {
        const payload: JWTPayload = {
            userID: user.id.toString(),
            email: user.email,
            role: user.role
        }
        return {
            accessToken: generateJWT(payload),
            refreshToken: this.generateRefreshToken(user.id)
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