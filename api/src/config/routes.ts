import { type Express, Router } from 'express'
import taskRoutes from '../routes/task-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  taskRoutes(router)
}
