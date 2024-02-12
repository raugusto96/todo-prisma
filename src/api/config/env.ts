import dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrl: process.env.DATABASE_URL,
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET
}
