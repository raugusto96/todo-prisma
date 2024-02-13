import { MissingParamError } from '../../utils/errors'
import { badRequest, notFound, ok } from '../../utils/helpers/http-helper'
import { NotFoundEntityError } from '../../utils/errors/not-found-entity-error'
import { HttpRequest } from '../../utils/protocols'
import { DeleteDbTaskRepository } from '../../repositories/db/usecases/delete-task'
import { DeleteTaskController } from './delete-task-controller'

const makeUpdateDbTaskRepositoryStub = () => {
  class DeleteTaskDbRepository implements DeleteDbTaskRepository {
    async delete(taskId: string): Promise<void> {}
  }
  return new DeleteTaskDbRepository()
}

interface SutTypes {
  sut: DeleteTaskController
}

const makeSut = (): SutTypes => {
  const sut = new DeleteTaskController()
  return {
    sut
  }
}

const makeFakeRequest = (body?: any, params?: any): HttpRequest => ({
  body,
  params
})

describe('UpdateTaskController', () => {
  test('should return 400 if taskId is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest({}, {})
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('taskId')))
  })
})
