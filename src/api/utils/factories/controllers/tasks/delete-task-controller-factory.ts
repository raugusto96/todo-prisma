import { DeleteTaskController } from '../../../../controllers/tasks/delete-task-controller'
import { DeleteTaskDbRepository } from '../../../../repositories/db/tasks/delete-db-task'
import { LoadTaskDbRepository } from '../../../../repositories/db/tasks/load-db-task'
import { Controller } from '../../../protocols'

export const makeDeleteTaskController = (): Controller => {
  const loadDbTaskRepository = new LoadTaskDbRepository()
  const deleteDbTaskRepository = new DeleteTaskDbRepository(
    loadDbTaskRepository
  )
  const controller = new DeleteTaskController(deleteDbTaskRepository)
  return controller
}
