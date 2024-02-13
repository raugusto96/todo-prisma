import { Controller } from '../../../protocols'
import { LoadTaskController } from '../../../../controllers/tasks/load-task-controller'
import { LoadTaskDbRepository } from '../../../../repositories/db/tasks/load-db-task'

export const makeLoadTaskController = (): Controller => {
  const loadDbTaskRepository = new LoadTaskDbRepository()
  const controller = new LoadTaskController(loadDbTaskRepository)
  return controller
}
