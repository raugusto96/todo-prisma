import { Task } from '@prisma/client'
import { LoadDbTaskRepository } from '../usecases/load-task'
import { UpdateTaskDbRepository } from './update-db-task'

const makeLoadTaskDbRepositoryStub = () => {
  class LoadTaskDbRepository implements LoadDbTaskRepository {
    async load(taskId: string): Promise<Task> {
      return Promise.resolve({
        id: 'any_valid_id',
        message: 'any_valid_message',
        status: 'any_valid_status'
      })
    }
  }
  return new LoadTaskDbRepository()
}

interface SutTypes {
  sut: UpdateTaskDbRepository
  loadTaskDbRepositoryStub: LoadDbTaskRepository
}

const makeSut = (): SutTypes => {
  const loadTaskDbRepositoryStub = makeLoadTaskDbRepositoryStub()
  const sut = new UpdateTaskDbRepository(loadTaskDbRepositoryStub)
  return {
    sut,
    loadTaskDbRepositoryStub
  }
}

describe('UpdateDbTaskRepository', () => {
  test('should calls LoadDbTaskRepository with correct value', async () => {
    const { sut, loadTaskDbRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadTaskDbRepositoryStub, 'load')
    await sut.update('any_valid_id')
    expect(loadSpy).toHaveBeenCalledWith('any_valid_id')
  })
})
