import { AddTaskController } from '../../../../controllers/tasks/add-task-controller'
import { Controller } from '../../../protocols'
import { AddTaskDbRepository } from '../../../../repositories/db/tasks/add-db-task'

export const makeAddTaskController = (): Controller => {
  const addDbTaskRepository = new AddTaskDbRepository()
  const controller = new AddTaskController(addDbTaskRepository)
  return controller
}
