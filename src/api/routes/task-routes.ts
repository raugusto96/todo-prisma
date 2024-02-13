import { Router } from 'express'
import { adaptRoute } from '../utils/adapters/express-route-adapter'
import { makeAddTaskController } from '../utils/factories/controllers/tasks/add-task-controller-factory'
import { makeLoadTaskController } from '../utils/factories/controllers/tasks/load-task-controller-factory'
import { makeLoadTasksController } from '../utils/factories/controllers/tasks/load-tasks-controller-factory'
import { makeUpdateTasksController } from '../utils/factories/controllers/tasks/update-tasks-controller-factory'

export default (router: Router): void => {
  router.post('/task', adaptRoute(makeAddTaskController()))
  router.get('/task', adaptRoute(makeLoadTasksController()))
  router.get('/task/:taskId', adaptRoute(makeLoadTaskController()))
  router.put('/task/:taskId', adaptRoute(makeUpdateTasksController()))
}
