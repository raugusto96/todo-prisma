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

describe('Task Controller', () => {
  test('should return 400 if message is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: {} })
    expect(httpResponse).toEqual({ statusCode: 400, body: new Error('Missing Param Error')})
  })
})