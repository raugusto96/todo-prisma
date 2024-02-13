import { Task } from '@prisma/client'
import { MissingParamError } from '../../utils/errors'
import { badRequest, notFound, ok } from '../../utils/helpers/http-helper'
import { LoadTaskController } from './load-task-controller'
import { LoadDbTaskRepository } from '../../repositories/db/usecases/load-task'
import { NotFoundEntityError } from '../../utils/errors/not-found-entity-error'

const makeLoadTaskRepositoryStub = () => {
  class LoadTaskRepository implements LoadDbTaskRepository {
    async load(taskId: string): Promise<Task> {
      return Promise.resolve({
        id: 'any_valid_id',
        message: 'any_valid_message',
        status: 'any_valid_status'
      })
    }
  }
  return new LoadTaskRepository()
}

interface SutTypes {
  sut: LoadTaskController
  loadTaskRepository: LoadDbTaskRepository
}

const makeSut = (): SutTypes => {
  const loadTaskRepository = makeLoadTaskRepositoryStub()
  const sut = new LoadTaskController(loadTaskRepository)
  return {
    sut,
    loadTaskRepository
  }
}

const makeFakeTask = (): Task => ({
  id: 'any_valid_id',
  message: 'any_valid_message',
  status: 'any_valid_status'
})

describe('LoadTaskController', () => {
  test('should return 400 if taskId is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {},
      params: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('taskId')))
  })

  test('should return 404 if LoadTaskRepository not find an task', async () => {
    const { sut, loadTaskRepository } = makeSut()
    jest
      .spyOn(loadTaskRepository, 'load')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpRequest = {
      body: {},
      params: {
        taskId: 'any_valid_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(notFound(new NotFoundEntityError('Task')))
  })

  test('should call LoadTaskRepository with correct values', async () => {
    const { sut, loadTaskRepository } = makeSut()
    const loadSpy = jest.spyOn(loadTaskRepository, 'load')
    const httpRequest = {
      body: {},
      params: {
        taskId: 'any_valid_id'
      }
    }
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith('any_valid_id')
  })

  test('should returns an task on success', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {},
      params: {
        taskId: 'any_valid_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(makeFakeTask()))
  })
})
