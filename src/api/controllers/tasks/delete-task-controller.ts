import { DeleteDbTaskRepository } from '../../repositories/db/usecases/delete-task'
import { UpdateDbTaskRepository } from '../../repositories/db/usecases/update-task'
import { MissingParamError } from '../../utils/errors'
import { NotFoundEntityError } from '../../utils/errors/not-found-entity-error'
import {
  badRequest,
  noContent,
  notFound,
  ok,
  serverError
} from '../../utils/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../utils/protocols'

export class DeleteTaskController implements Controller {
  constructor(
    private readonly deleteDbTaskRepository: DeleteDbTaskRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['taskId']
      for (const field of requiredFields) {
        if (!httpRequest.params[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { taskId } = httpRequest.params
      const isNull = await this.deleteDbTaskRepository.delete(taskId)
      return isNull === null
        ? notFound(new NotFoundEntityError('Task'))
        : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
