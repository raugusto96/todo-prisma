import { Router } from 'express'
import { adaptRoute } from '../utils/adapters/express-route-adapter'
import { makeTaskController } from '../utils/factories/controllers/tasks/task-controller-factory'

export default (router: Router): void => {
  router.post('/task', adaptRoute(makeTaskController()))
}
