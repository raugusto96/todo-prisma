import { Task } from '@prisma/client'
import { MissingParamError } from '../../utils/errors'
import { badRequest } from '../../utils/helpers/http-helper'
import { LoadTaskController } from './load-task-controller'
import { LoadDbTaskRepository } from '../../repositories/db/usecases/load-task'

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

describe('LoadTaskController', () => {
  test('should return 400 if taskId is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ taskId: '' })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('taskId')))
  })

  test('should call LoadTaskRepository with correct values', async () => {
    const { sut, loadTaskRepository } = makeSut()
    const loadSpy = jest.spyOn(loadTaskRepository, 'load')
    const request = {
      taskId: 'any_valid_id'
    }
    await sut.handle(request)
    expect(loadSpy).toHaveBeenCalledWith('any_valid_id')
  })
})
