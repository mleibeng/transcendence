/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.ts                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:10:19 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 17:10:21 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import fastify from "fastify";
import { initDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import fastifyCookie from '@fastify/cookie'

const requiredEnvVars = ['JWT_SECRET', 'REFRESH_TOKEN_SECRET'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

const app = fastify();

app.register(fastifyCookie, { // fastifyCookie is new have to check the interface
    secret: process.env.COOKIE_SECRET,
    hook: 'onRequest',
    parseOptions: {
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    }
})


initDataSource().then(() => {
    app.register(authRoutes)

    app.listen({port: 3000}, (err) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log('Server listening on port 3000')
    })
})