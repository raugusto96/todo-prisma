import { LoadDbTaskRepository } from '../../repositories/db/usecases/load-task'
import { MissingParamError } from '../../utils/errors'
import { NotFoundEntityError } from '../../utils/errors/not-found-entity-error'
import {
  badRequest,
  notFound,
  ok,
  serverError
} from '../../utils/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../utils/protocols'

export class LoadTaskController implements Controller {
  constructor(private readonly loadDbTaskRepository: LoadDbTaskRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['taskId']
      for (const field of requiredFields) {
        if (!httpRequest.params[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { taskId } = httpRequest.params
      const task = await this.loadDbTaskRepository.load(taskId)
      if (!task) {
        return notFound(new NotFoundEntityError('Task'))
      }
      return ok(task)
    } catch (error) {
      return serverError(error)
    }
  }
}
