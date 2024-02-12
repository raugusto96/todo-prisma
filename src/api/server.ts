import env from './config/env'
import prisma from './config/prismaClient'

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
