import { Router } from 'express'
import { adaptRoute } from '../utils/adapters/express-route-adapter'
import { makeAddTaskController } from '../utils/factories/controllers/tasks/add-task-controller-factory'
import { makeLoadTaskController } from '../utils/factories/controllers/tasks/load-task-controller-factory'

export default (router: Router): void => {
  router.post('/task', adaptRoute(makeAddTaskController()))
  router.get('/task/:taskId', adaptRoute(makeLoadTaskController()))
}
