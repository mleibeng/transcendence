import fastify from "fastify";
import { initDataSource } from "./data-source";
import authRoutes from "./routes/auth";

const requiredEnvVars = ['JWT_SECRET', 'REFRESH_TOKEN_SECRET'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

const app = fastify();

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