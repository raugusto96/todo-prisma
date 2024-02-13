import { MissingParamError } from '../../utils/errors'
import {
  badRequest,
  noContent,
  notFound
} from '../../utils/helpers/http-helper'
import { NotFoundEntityError } from '../../utils/errors/not-found-entity-error'
import { HttpRequest } from '../../utils/protocols'
import { DeleteDbTaskRepository } from '../../repositories/db/usecases/delete-task'
import { DeleteTaskController } from './delete-task-controller'

const makeDeleteDbTaskRepositoryStub = () => {
  class DeleteTaskDbRepository implements DeleteDbTaskRepository {
    async delete(_taskId: string): Promise<void | null> {}
  }
  return new DeleteTaskDbRepository()
}

interface SutTypes {
  sut: DeleteTaskController
  deleteDbTaskRepositoryStub: DeleteDbTaskRepository
}

const makeSut = (): SutTypes => {
  const deleteDbTaskRepositoryStub = makeDeleteDbTaskRepositoryStub()
  const sut = new DeleteTaskController(deleteDbTaskRepositoryStub)
  return {
    sut,
    deleteDbTaskRepositoryStub
  }
}

const makeFakeRequest = (body?: any, params?: any): HttpRequest => ({
  body,
  params
})

describe('DeleteTaskController', () => {
  test('should return 400 if taskId is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest({}, {})
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('taskId')))
  })

  test('should return 404 if DeleteDbTaskRepository do not find a task with taskId', async () => {
    const { sut, deleteDbTaskRepositoryStub } = makeSut()
    const httpRequest = makeFakeRequest(
      {},
      {
        taskId: 'any_valid_id'
      }
    )
    jest
      .spyOn(deleteDbTaskRepositoryStub, 'delete')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(notFound(new NotFoundEntityError('Task')))
  })

  test('should call DeleteDbTaskRepository with correct values', async () => {
    const { sut, deleteDbTaskRepositoryStub } = makeSut()
    const httpRequest = makeFakeRequest(
      {},
      {
        taskId: 'any_valid_id'
      }
    )
    const deleteSpy = jest.spyOn(deleteDbTaskRepositoryStub, 'delete')
    await sut.handle(httpRequest)
    expect(deleteSpy).toHaveBeenCalledWith('any_valid_id')
  })

  test('should return 204 if delete succeeds', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest(
      {},
      {
        taskId: 'any_valid_id'
      }
    )
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })
})
