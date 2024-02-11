import { MissingParamError } from "../../utils/errors/missing-param-error";
import { badRequest } from "../../utils/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../utils/protocols";

export class TaskController implements Controller {
  async handle (httpRequest: HttpRequest):Promise<HttpResponse> {
    const requiredFields = ['message', 'status'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return { statusCode: 0, body: {} }
  }
}