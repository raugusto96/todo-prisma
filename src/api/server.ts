import { PrismaClient } from '@prisma/client'
import env from './config/env'
const prisma = new PrismaClient()

async function main() {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => {
    console.log(`Server running at http://localhost:${env.port}`)
  })
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
