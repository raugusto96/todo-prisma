import { LoadDbTaskRepository } from '../../repositories/db/usecases/load-task'
import { MissingParamError } from '../../utils/errors'
import { badRequest, serverError } from '../../utils/helpers/http-helper'
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
      await this.loadDbTaskRepository.load(taskId)
      return {
        statusCode: 200,
        body: ''
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
