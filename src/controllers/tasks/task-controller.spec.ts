import { TaskController } from "./task-controller"

describe('Task Controller', () => {
  test('should return 400 if message is not provided', async () => {
    const sut = new TaskController()
    const httpResponse = await sut.handle({ body: {} })
    expect(httpResponse).toEqual({ statusCode: 400, body: new Error('Missing Param Error')})
  })
})