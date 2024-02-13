import { Collection } from 'mongodb'
import { MongoHelper } from '../../../utils/helpers/mongo-helper'
import env from '../../../config/env'
import { LoadTasksDbRepository } from './load-db-tasks'

let taskCollection: Collection

interface SutTypes {
  sut: LoadTasksDbRepository
}

const makeSut = (): SutTypes => {
  const sut = new LoadTasksDbRepository()
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

  test('should load an task array on success', async () => {
    const { sut } = makeSut()
    await taskCollection.insertMany([
      {
        message: 'any_message',
        status: 'any_status'
      },
      {
        message: 'any_message',
        status: 'any_status'
      }
    ])
    const findedTasks = await sut.load()
    expect(findedTasks).toHaveLength(2)
  })
})
