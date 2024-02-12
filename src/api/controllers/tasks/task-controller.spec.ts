import { badRequest, ok } from '../../utils/helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../utils/protocols'
import { TaskController } from './task-controller'
import { CreateTaskDTO } from '../../models/dtos'
import { Task } from '../../models/usecases'
import { MissingParamError } from '../../utils/errors/missing-param-error'
import { AddDbTaskRepository } from '../../repositories/db/usecases/add-task'

const makeAddTaskServiceStub = () => {
  class AddTaskService implements AddDbTaskRepository {
    async add(task: CreateTaskDTO): Promise<Task> {
      return Promise.resolve({
        id: 'any_valid_id',
        message: 'any_valid_message',
        status: 'any_valid_status'
      })
    }
  }
  return new AddTaskService()
}

interface SutTypes {
  sut: TaskController
  addTaskServiceStub: AddDbTaskRepository
}

const makeSut = (): SutTypes => {
  const addTaskServiceStub = makeAddTaskServiceStub()
  const sut = new TaskController(addTaskServiceStub)
  return {
    sut,
    addTaskServiceStub
  }
}

const makeFakeHttpRequest = (body: any): HttpRequest => ({ body })

const makeFakeTask = (): Task => ({
  id: 'any_valid_id',
  message: 'any_valid_message',
  status: 'any_valid_status'
})

describe('Task Controller', () => {
  test('should return 400 if message is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: {} })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('message')))
  })

  test('should call AddTaskService with correct values', async () => {
    const { sut, addTaskServiceStub } = makeSut()
    const addSpy = jest.spyOn(addTaskServiceStub, 'add')
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
