import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../utils/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import env from '../config/env'

let taskCollection: Collection

describe('Task Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    taskCollection = await MongoHelper.getCollection('tasks')
    await taskCollection.deleteMany({})
  })

  describe('POST /task', () => {
    test('should return 200 on add task success', async () => {
      await request(app)
        .post('/api/task')
        .send({
          message: 'Task'
        })
        .expect(200)
    })
  })
})
