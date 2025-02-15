/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fastify.d.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:09:55 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 17:09:56 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { FastifyRequest } from "fastify";
import { JWTPayload } from "./auth.types";


declare module 'fastify' {
    interface FastifyRequest {
        user?: JWTPayload
    }
}
