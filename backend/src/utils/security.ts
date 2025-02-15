/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   security.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:10:15 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 17:10:16 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/auth.types';

// Token generation functions for JWT/ password hashing

export function generateJWT(payload: JWTPayload): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET ENV variable not set')
    }
    return jwt.sign(payload, secret, {expiresIn: '1h'})
}

export async function hashPW(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds)
}

// Token authentication / checking functions for JWT / password hash

export async function verifyPW(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
}

export async function verifyJWT(token: string): Promise<JWTPayload> {
    return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
}
