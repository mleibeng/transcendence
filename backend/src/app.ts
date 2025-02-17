/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.ts                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:10:19 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/17 01:34:20 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import fastify from "fastify";
import { initDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

const requiredEnvVars = ['JWT_SECRET', 'REFRESH_TOKEN_SECRET', 'FRONTEND_URL'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

const app = fastify({
    // http2: true,
    // https: {
        // key: fs.readFileSync(path.join(__dirname, 'certs', 'localhost-key.pem')),
        // cert: fs.readFileSync(path.join(__dirname, 'certs', 'localhost.pem')),
    //}
});

app.register(cors, {
    origin:  '*', //process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
})

app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
    hook: 'onRequest',
    parseOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict'
    }
})

initDataSource().then(() => {
    app.register(authRoutes)

    app.listen({host: '0.0.0.0', port: 3000}, (err) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log('Server listening on port 3000')
    })
})