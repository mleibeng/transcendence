import { FastifyReply, FastifyRequest } from "fastify";
import { verifyJWT } from "../utils/security";

export async function authenticateJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
        const token = request.cookies.accessToken;
        if (!token)
            return reply.code(401).send({error: 'No authentication token provided'})

        const payload = await verifyJWT(token);
        request.user = payload
    }
    catch (error) {
        reply.code(401).send({error: 'invalid token'})
    }
}