/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.types.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: node <node@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:53 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 20:00:56 by node             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export interface UserCredentials {
    email:string;
    password: string;
}

export interface RegisterCredentials extends UserCredentials {
    username: string;
    displayName: string;
}

export interface TwoFactorInfo {
    secret: string
    otpauthUrl: string
    qrCodeUrl: string
}

export interface VerifyTwoFactor {
    email:string
    token:string
}

export interface JWTPayload {
    userID: string;
    email: string;
    role: string;
    userId?:number
    type?:string
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
