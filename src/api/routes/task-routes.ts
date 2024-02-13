import { Router } from 'express'
import { adaptRoute } from '../utils/adapters/express-route-adapter'
import { makeAddTaskController } from '../utils/factories/controllers/tasks/add-task-controller-factory'

export default (router: Router): void => {
  router.post('/task', adaptRoute(makeAddTaskController()))
}
