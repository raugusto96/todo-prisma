import { type Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(path.resolve(__dirname, '../routes')).map(async (file) => {
    if (!file.includes('.test.')) {
      if (await import(`../routes/${file}`)) {
        ;(await import(`../routes/${file}`)).default(router)
      } else {
        console.warn(`Warning: '${file}' does not export a default function.`)
      }
    }
  })
}
