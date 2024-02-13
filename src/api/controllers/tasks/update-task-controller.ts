import { UpdateDbTaskRepository } from '../../repositories/db/usecases/update-task'
import { MissingParamError } from '../../utils/errors'
import {
  badRequest,
  notFound,
  ok,
  serverError
} from '../../utils/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../utils/protocols'

export class UpdateTaskController implements Controller {
  constructor(
    private readonly updateDbTaskRepository: UpdateDbTaskRepository
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
      const { message, status } = httpRequest.body
      await this.updateDbTaskRepository.update(taskId, { message, status })
    } catch (error) {
      return serverError(error)
    }
  }
}
