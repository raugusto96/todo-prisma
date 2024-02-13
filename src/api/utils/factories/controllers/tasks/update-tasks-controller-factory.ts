import { Controller } from '../../../protocols'
import { UpdateTaskController } from '../../../../controllers/tasks/update-task-controller'
import { UpdateTaskDbRepository } from '../../../../repositories/db/tasks/update-db-task'
import { LoadDbTaskRepository } from './../../../../repositories/db/usecases/load-task'
import { LoadTaskDbRepository } from '../../../../repositories/db/tasks/load-db-task'

export const makeUpdateTasksController = (): Controller => {
  const loadDbTaskRepository = new LoadTaskDbRepository()
  const updateDbTaskRepository = new UpdateTaskDbRepository(
    loadDbTaskRepository
  )
  const controller = new UpdateTaskController(updateDbTaskRepository)
  return controller
}
