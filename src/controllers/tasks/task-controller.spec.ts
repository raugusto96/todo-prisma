import { badRequest, ok } from '../../utils/helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../utils/protocols'
import { TaskController } from './task-controller'
import { CreateTaskDTO } from '../../models/dtos'
import { Task } from '../../models/usecases'
import { MissingParamError } from '../../utils/errors/missing-param-error'
import { CreateTaskService } from '../../services/tasks/protocols/add-task-service'

const makeAddTaskServiceStub = () => {
  class AddTaskService implements CreateTaskService {
    async add(task: CreateTaskDTO): Promise<Task> {
      return Promise.resolve({
        id: 0,
        message: 'any_valid_message',
        status: 'any_valid_status'
      })
    }
  }
  return new AddTaskService()
}

interface SutTypes {
  sut: TaskController
  addTaskServiceStub: CreateTaskService
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
  id: 0,
  message: 'any_valid_message',
  status: 'any_valid_status'
})

describe('Task Controller', () => {
  test('should return 400 if message is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: {} })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('message')))
  })

  test('should return 400 if status is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeHttpRequest({
      message: 'any_message'
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('status')))
  })

  test('should call AddTaskService with correct values', async () => {
    const { sut, addTaskServiceStub } = makeSut()
    const addSpy = jest.spyOn(addTaskServiceStub, 'add')
    const httpRequest = makeFakeHttpRequest({
      message: 'any_message',
      status: 'any_status'
    })
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      message: 'any_message',
      status: 'any_status'
    })
  })

  test('should returns an task on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeHttpRequest({
      message: 'any_message',
      status: 'any_status'
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(makeFakeTask()))
  })
})
