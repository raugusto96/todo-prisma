import { MissingParamError } from "../../utils/errors/missing-param-error"
import { badRequest } from "../../utils/helpers/http-helper"
import { HttpRequest } from "../../utils/protocols"
import { TaskController } from "./task-controller"

interface SutTypes {
  sut: TaskController
}

const makeSut = (): SutTypes => {
  const sut = new TaskController()
  return {
    sut
  }
}

const makeFakeHttpRequest = (body: any): HttpRequest => ({ body });

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
})