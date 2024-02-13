import { UpdateDbTaskRepository } from '../../repositories/db/usecases/update-task'
import { MissingParamError } from '../../utils/errors'
import { NotFoundEntityError } from '../../utils/errors/not-found-entity-error'
import {
  badRequest,
  notFound,
  ok,
  serverError
} from '../../utils/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../utils/protocols'

export class DeleteTaskController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['taskId']
      for (const field of requiredFields) {
        if (!httpRequest.params[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
