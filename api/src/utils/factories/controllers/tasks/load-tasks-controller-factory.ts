import { Controller } from '../../../protocols'
import { LoadTasksDbRepository } from '../../../../repositories/db/tasks/load-db-tasks'
import { LoadTasksController } from '../../../../controllers/tasks/load-tasks-controller'

export const makeLoadTasksController = (): Controller => {
  const loadDbTasksRepository = new LoadTasksDbRepository()
  const controller = new LoadTasksController(loadDbTasksRepository)
  return controller
}
