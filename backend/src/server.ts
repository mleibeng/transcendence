import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import websocket from '@fastify/websocket'
import * as dotenv from 'dotenv'
import { initializeDatabase, closeDatabase } from './config/database'

dotenv.config()

const fastify = Fastify({
  logger: true
})

// Register Fastify plugins
fastify.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
})

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined')
}

fastify.register(jwt, {
  secret: process.env.JWT_SECRET
})

fastify.register(websocket)

// Health check endpoint
fastify.get('/health', async () => {
  return { status: 'ok' }
})

// WebSocket game endpoint
fastify.register(async function (fastify) {
  fastify.get('/game', { websocket: true }, (connection, req) => {
    connection.socket.on('message', (message: string) => {
      console.log('Received message:', message.toString())
    })
  })
})

// Server startup function
const start = async () => {
  try {
    // Initialize database before starting the server
    const db = await initializeDatabase()
    fastify.log.info('Database initialized successfully')

    // Decorate fastify instance with database
    fastify.decorate('db', db)

    // Start the server
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    await closeDatabase()
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  fastify.log.info('SIGTERM received. Closing database and shutting down...')
  await closeDatabase()
  process.exit(0)
})

process.on('SIGINT', async () => {
  fastify.log.info('SIGINT received. Closing database and shutting down...')
  await closeDatabase()
  process.exit(0)
})

start()