import { TaskController } from '../../../../controllers/tasks/task-controller'
import { AddTaskService } from '../../../../services/tasks/task-service'
import { Controller } from '../../../protocols'

export const makeTaskController = (): Controller => {
  const addTaskService = new AddTaskService()
  const controller = new TaskController(addTaskService)
  return controller
}
