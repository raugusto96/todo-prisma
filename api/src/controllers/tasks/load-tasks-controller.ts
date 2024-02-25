import { LoadDbTasksRepository } from '../../repositories/db/usecases/load-tasks'
import { NotFoundEntityError } from '../../utils/errors/not-found-entity-error'
import { notFound, ok, serverError } from '../../utils/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../utils/protocols'

export class LoadTasksController implements Controller {
  constructor(private readonly loadDbTasksRepository: LoadDbTasksRepository) {}

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const tasks = await this.loadDbTasksRepository.load()
      return tasks.length
        ? ok(tasks)
        : notFound(new NotFoundEntityError('Tasks'))
    } catch (error) {
      return serverError(error)
    }
  }
}
