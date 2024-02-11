import { MissingParamError } from "../../utils/errors/missing-param-error";
import { badRequest } from "../../utils/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../utils/protocols";

export class TaskController implements Controller {
  async handle (httpRequest: HttpRequest):Promise<HttpResponse> {
    const { message, status } = httpRequest.body
    if (!message) return badRequest(new MissingParamError('Message'))
    if (!status) return badRequest(new MissingParamError('Status'))
    return { statusCode: 0, body: {} }
  }
}