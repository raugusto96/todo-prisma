import { Collection } from 'mongodb'
import env from '../../../config/env'
import { MongoHelper } from '../../../utils/helpers/mongo-helper'
import { AddTaskDbRepository } from './add-db-task'

let taskCollection: Collection
describe('AddDbTaskRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    taskCollection = await MongoHelper.getCollection('tasks')
    await taskCollection.deleteMany({})
  })
  test('should add a task on success', async () => {
    const sut = new AddTaskDbRepository()
    await sut.add({
      message: 'any_message'
    })
    const task = await taskCollection.findOne({ message: 'any_message' })
    expect(task).toBeTruthy()
  })
})
