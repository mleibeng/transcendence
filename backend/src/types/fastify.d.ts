
import { Database } from 'sqlite'
import 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    db: Database
  }
}