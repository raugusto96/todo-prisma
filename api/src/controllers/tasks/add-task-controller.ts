import { Controller, HttpRequest, HttpResponse } from '../../utils/protocols'
import { badRequest, ok, serverError } from '../../utils/helpers/http-helper'
import { MissingParamError } from '../../utils/errors/missing-param-error'
import { AddDbTaskRepository } from '../../repositories/db/usecases/add-task'

export class AddTaskController implements Controller {
  constructor(private readonly addDbTaskRepository: AddDbTaskRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['message']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { message } = httpRequest.body
      const task = await this.addDbTaskRepository.add({ message })
      return ok(task)
    } catch (error) {
      return serverError(error)
    }
  }
}
