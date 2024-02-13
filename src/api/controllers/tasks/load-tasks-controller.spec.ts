import { Task } from '@prisma/client'
import { noContent, ok } from '../../utils/helpers/http-helper'
import { LoadDbTasksRepository } from '../../repositories/db/usecases/load-tasks'
import { LoadTasksController } from './load-tasks-controller'

const makeLoadTaskRepositoryStub = () => {
  class LoadTasksRepository implements LoadDbTasksRepository {
    async load(): Promise<Task[]> {
      return Promise.resolve([
        {
          id: 'any_valid_id',
          message: 'any_valid_message',
          status: 'any_valid_status'
        }
      ])
    }
  }
  return new LoadTasksRepository()
}

interface SutTypes {
  sut: LoadTasksController
  loadTasksRepository: LoadDbTasksRepository
}

const makeSut = (): SutTypes => {
  const loadTasksRepository = makeLoadTaskRepositoryStub()
  const sut = new LoadTasksController(loadTasksRepository)
  return {
    sut,
    loadTasksRepository
  }
}

const makeFakeTask = (): Task[] => [
  {
    id: 'any_valid_id',
    message: 'any_valid_message',
    status: 'any_valid_status'
  }
]

describe('LoadTaskController', () => {
  test('should return 204 if LoadTasksRepository not find any task', async () => {
    const { sut, loadTasksRepository } = makeSut()
    jest
      .spyOn(loadTasksRepository, 'load')
      .mockReturnValueOnce(Promise.resolve([]))
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })

  test('should returns an task array on success', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(makeFakeTask()))
  })
})
