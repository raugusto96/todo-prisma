import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class TaskController implements Controller {
  async handle (httpRequest: HttpRequest):Promise<HttpResponse> {
    const { message } = httpRequest.body
    if (!message) return { statusCode: 400, body: new Error('Missing Param Error')}
    return { statusCode: 0, body: {} }
  }
}