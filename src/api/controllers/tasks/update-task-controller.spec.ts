import { Task } from '@prisma/client'
import { MissingParamError } from '../../utils/errors'
import { badRequest, notFound, ok } from '../../utils/helpers/http-helper'
import { UpdateTaskController } from './update-task-controller'
import { UpdateDbTaskRepository } from '../../repositories/db/usecases/update-task'

const makeUpdateDbTaskRepositoryStub = () => {
  class UpdateTaskDbRepository implements UpdateDbTaskRepository {
    async update(taskId: string): Promise<Task> {
      return Promise.resolve({
        id: 'any_valid_id',
        message: 'any_valid_message',
        status: 'any_valid_status'
      })
    }
  }
  return new UpdateTaskDbRepository()
}

interface SutTypes {
  sut: UpdateTaskController
  updateDbTaskRepositoryStub: UpdateDbTaskRepository
}

const makeSut = (): SutTypes => {
  const updateDbTaskRepositoryStub = makeUpdateDbTaskRepositoryStub()
  const sut = new UpdateTaskController(updateDbTaskRepositoryStub)
  return {
    sut,
    updateDbTaskRepositoryStub
  }
}

const makeFakeTask = (): Task => ({
  id: 'any_valid_id',
  message: 'any_valid_message',
  status: 'any_valid_status'
})

describe('UpdateTaskController', () => {
  test('should return 400 if taskId is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('taskId')))
  })

  test('should call UpdateDbTaskRepository with correct value', async () => {
    const { sut, updateDbTaskRepositoryStub } = makeSut()
    const httpRequest = {
      body: {
        message: 'any_message_to_update',
        status: 'any_status_to_update'
      },
      params: {
        taskId: 'any_valid_id'
      }
    }
    const updateSpy = jest.spyOn(updateDbTaskRepositoryStub, 'update')
    await sut.handle(httpRequest)
    expect(updateSpy).toHaveBeenCalledWith('any_valid_id', {
      message: httpRequest.body.message,
      status: httpRequest.body.status
    })
  })
})
