import { FastifyRequest } from "fastify";
import { JWTPayload } from "./auth.types";


declare module 'fastify' {
    interface FastifyRequest {
        user?: JWTPayload
    }
}
