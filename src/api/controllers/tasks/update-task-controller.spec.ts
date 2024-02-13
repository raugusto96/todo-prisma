import { Task } from '@prisma/client'
import { MissingParamError } from '../../utils/errors'
import { badRequest, notFound, ok } from '../../utils/helpers/http-helper'
import { LoadTaskController } from './load-task-controller'
import { LoadDbTaskRepository } from '../../repositories/db/usecases/load-task'
import { NotFoundEntityError } from '../../utils/errors/not-found-entity-error'
import { UpdateTaskController } from './update-task-controller'

interface SutTypes {
  sut: UpdateTaskController
}

const makeSut = (): SutTypes => {
  const sut = new UpdateTaskController()
  return {
    sut
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
})
