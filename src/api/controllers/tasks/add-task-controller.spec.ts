import { badRequest, ok } from '../../utils/helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../utils/protocols'
import { AddTaskController } from './add-task-controller'
import { CreateTaskDTO } from '../../models/dtos'
import { STATUS, Task } from '../../models/usecases'
import { MissingParamError } from '../../utils/errors/missing-param-error'
import { AddDbTaskRepository } from '../../repositories/db/usecases/add-task'

const makeAddDbTaskRepositoryStub = () => {
  class AddDbTaskRepository implements AddDbTaskRepository {
    async add(task: CreateTaskDTO): Promise<Task> {
      return Promise.resolve({
        id: 'any_valid_id',
        message: 'any_valid_message',
        status: STATUS.PENDING
      })
    }
  }
  return new AddDbTaskRepository()
}

interface SutTypes {
  sut: AddTaskController
  addDbTaskRepositoryStub: AddDbTaskRepository
}

const makeSut = (): SutTypes => {
  const addDbTaskRepositoryStub = makeAddDbTaskRepositoryStub()
  const sut = new AddTaskController(addDbTaskRepositoryStub)
  return {
    sut,
    addDbTaskRepositoryStub
  }
}

const makeFakeHttpRequest = (body: any): HttpRequest => ({ body })

const makeFakeTask = (): Task => ({
  id: 'any_valid_id',
  message: 'any_valid_message',
  status: STATUS.PENDING
})

describe('AddTaskController', () => {
  test('should return 400 if message is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: {} })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('message')))
  })

  test('should call AddDbTaskRepository with correct values', async () => {
    const { sut, addDbTaskRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addDbTaskRepositoryStub, 'add')
    const httpRequest = makeFakeHttpRequest({
      message: 'any_message'
    })
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      message: 'any_message'
    })
  })

  test('should returns an task on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeHttpRequest({
      message: 'any_message'
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(makeFakeTask()))
  })
})
