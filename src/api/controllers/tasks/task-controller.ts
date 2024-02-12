import { Controller, HttpRequest, HttpResponse } from '../../utils/protocols'
import { badRequest, ok, serverError } from '../../utils/helpers/http-helper'
import { MissingParamError } from '../../utils/errors/missing-param-error'
import { CreateTaskService } from '../../services/tasks/protocols/add-task-service'

export class TaskController implements Controller {
  constructor(private readonly addTaskService: CreateTaskService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['message', 'status']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { message, status } = httpRequest.body
      const task = await this.addTaskService.add({ message, status })
      return ok(task)
    } catch (error) {
      return serverError(error)
    }
  }
}
