import { MissingParamError } from '../../utils/errors'
import { badRequest } from '../../utils/helpers/http-helper'
import { LoadTaskController } from './load-task-controller'

interface SutTypes {
  sut: LoadTaskController
}

const makeSut = (): SutTypes => {
  const sut = new LoadTaskController()
  return {
    sut
  }
}

describe('LoadTaskController', () => {
  test('should return 400 if taskId is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ taskId: '' })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('taskId')))
  })
})
