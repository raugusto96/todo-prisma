import env from './src/config/env'
import prisma from './src/config/prismaClient'

async function main() {
  const app = (await import('./src/config/app')).default
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
