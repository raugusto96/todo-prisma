import { LoadDbTaskRepository } from '../../repositories/db/usecases/load-task'
import { MissingParamError } from '../../utils/errors'
import { badRequest } from '../../utils/helpers/http-helper'
import { Controller, HttpResponse } from '../../utils/protocols'

export class LoadTaskController implements Controller {
  constructor(private readonly loadDbTaskRepository: LoadDbTaskRepository) {}

  async handle(request: LoadTaskController.Request): Promise<HttpResponse> {
    const requiredFields = ['taskId']
    for (const field of requiredFields) {
      if (!request[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    await this.loadDbTaskRepository.load(request.taskId)
    return {
      statusCode: 0,
      body: ''
    }
  }
}

export namespace LoadTaskController {
  export type Request = {
    taskId: string
  }
}
