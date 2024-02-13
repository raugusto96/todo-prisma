import { Task } from '@prisma/client'
import { MissingParamError } from '../../utils/errors'
import { badRequest, notFound, ok } from '../../utils/helpers/http-helper'
import { UpdateTaskController } from './update-task-controller'
import { UpdateDbTaskRepository } from '../../repositories/db/usecases/update-task'
import { NotFoundEntityError } from '../../utils/errors/not-found-entity-error'
import { HttpRequest } from '../../utils/protocols'

const makeUpdateDbTaskRepositoryStub = () => {
  class UpdateTaskDbRepository implements UpdateDbTaskRepository {
    async update(taskId: string): Promise<Task | null> {
      return Promise.resolve({
        id: 'any_valid_id',
        message: 'any_updated_message',
        status: 'any_updated_status'
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

const makeFakeRequest = (body?: any, params?: any): HttpRequest => ({
  body,
  params
})

const makeFakeTask = (): Task => ({
  id: 'any_valid_id',
  message: 'any_valid_message',
  status: 'any_valid_status'
})

describe('UpdateTaskController', () => {
  test('should return 400 if taskId is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest({}, {})
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('taskId')))
  })

  test('should return 404 if UpdateDbTaskRepository do not find a task', async () => {
    const { sut, updateDbTaskRepositoryStub } = makeSut()
    const httpRequest = makeFakeRequest(
      {
        message: 'any_message_to_update',
        status: 'any_status_to_update'
      },
      {
        taskId: 'any_valid_id'
      }
    )
    jest
      .spyOn(updateDbTaskRepositoryStub, 'update')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(notFound(new NotFoundEntityError('Task')))
  })

  test('should call UpdateDbTaskRepository with correct value', async () => {
    const { sut, updateDbTaskRepositoryStub } = makeSut()
    const httpRequest = makeFakeRequest(
      {
        message: 'any_message_to_update',
        status: 'any_status_to_update'
      },
      {
        taskId: 'any_valid_id'
      }
    )

    const updateSpy = jest.spyOn(updateDbTaskRepositoryStub, 'update')
    await sut.handle(httpRequest)
    expect(updateSpy).toHaveBeenCalledWith('any_valid_id', {
      message: 'any_message_to_update',
      status: 'any_status_to_update'
    })
  })

  test('should returns a task on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest(
      {
        message: 'any_message_to_update',
        status: 'any_status_to_update'
      },
      {
        taskId: 'any_valid_id'
      }
    )

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(
      ok({
        id: 'any_valid_id',
        message: 'any_updated_message',
        status: 'any_updated_status'
      })
    )
  })
})
