/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.types.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:53 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 17:09:53 by mleibeng         ###   ########.fr       */
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

export interface JWTPayload {
    userID: string;
    email: string;
    role: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
