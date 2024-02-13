import { MissingParamError } from '../../utils/errors'
import { badRequest } from '../../utils/helpers/http-helper'
import { Controller, HttpResponse } from '../../utils/protocols'

export class LoadTaskController implements Controller {
  async handle(request: LoadTaskController.Request): Promise<HttpResponse> {
    const requiredFields = ['taskId']
    for (const field of requiredFields) {
      console.log(request[field])
      if (!request[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
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
