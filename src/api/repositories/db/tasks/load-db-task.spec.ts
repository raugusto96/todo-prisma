import { Collection } from 'mongodb'
import { MongoHelper } from '../../../utils/helpers/mongo-helper'
import env from '../../../config/env'
import { LoadTaskDbRepository } from './load-db-task'

let taskCollection: Collection

interface SutTypes {
  sut: LoadTaskDbRepository
}

const makeSut = (): SutTypes => {
  const sut = new LoadTaskDbRepository()
  return {
    sut
  }
}

describe('LoadDbTaskRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    taskCollection = await MongoHelper.getCollection('Task')
    await taskCollection.deleteMany({})
  })

  test('should load an task on success', async () => {
    const { sut } = makeSut()
    const task = await taskCollection.insertOne({
      message: 'any_message',
      status: 'any_status'
    })
    const findedTask = await sut.load(task.insertedId.toString())
    expect(findedTask).toBeTruthy()
  })
})
