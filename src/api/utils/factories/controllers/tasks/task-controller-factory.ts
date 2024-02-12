import { TaskController } from '../../../../controllers/tasks/task-controller'
import { Controller } from '../../../protocols'
import { AddTaskDbRepository } from '../../../../repositories/db/tasks/add-db-task'

export const makeTaskController = (): Controller => {
  const addDbTaskRepository = new AddTaskDbRepository()
  const controller = new TaskController(addDbTaskRepository)
  return controller
}
