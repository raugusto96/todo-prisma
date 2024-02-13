import { MissingParamError } from '../../utils/errors'
import { badRequest } from '../../utils/helpers/http-helper'
import { LoadTaskController } from './load-task-controller'

describe('LoadTaskController', () => {
  test('should return 400 if taskId is not provided', async () => {
    const sut = new LoadTaskController()
    const httpResponse = await sut.handle({ taskId: '' })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('taskId')))
  })
})
