import { LoadDbTasksRepository } from '../../repositories/db/usecases/load-tasks'
import { noContent, ok, serverError } from '../../utils/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../utils/protocols'

export class LoadTasksController implements Controller {
  constructor(private readonly loadDbTasksRepository: LoadDbTasksRepository) {}

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const tasks = await this.loadDbTasksRepository.load()
      return tasks.length ? ok(tasks) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
