import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../utils/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import env from '../config/env'
import { STATUS } from '../models/enums'

let taskCollection: Collection

describe('Task Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    taskCollection = await MongoHelper.getCollection('Task')
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

  describe('GET /task', () => {
    test('should return 204 on get tasks if do not have tasks registered', async () => {
      await request(app).get('/api/task').expect(204)
    })

    test('should return 200 on get tasks on success', async () => {
      await request(app)
        .post('/api/task')
        .send({
          message: 'Task'
        })
        .expect(200)
      await request(app).get('/api/task').expect(200)
    })
  })

  describe('GET /task/:taskId', () => {
    test('should return 200 on get tasks on success', async () => {
      const task = await taskCollection.insertOne({
        message: 'Task',
        status: STATUS.PENDING
      })
      await request(app)
        .get(`/api/task/${task.insertedId.toString()}`)
        .expect(200)
    })

    test('should return 404 if not found a task', async () => {
      await request(app).get(`/api/task/65cba4decf11db8558825326`).expect(404)
    })
  })

  describe('PUT /task/:taskId', () => {
    test('should return 200 when update a task on success', async () => {
      const task = await taskCollection.insertOne({
        message: 'Task',
        status: STATUS.PENDING
      })
      await request(app)
        .put(`/api/task/${task.insertedId.toString()}`)
        .expect(200)
    })

    test('should return 404 if not found a task', async () => {
      await request(app).put(`/api/task/65cba4decf11db8558825326`).expect(404)
    })
  })

  describe('DELETE /task/:taskId', () => {
    test('should return 204 when delete a task on success', async () => {
      const task = await taskCollection.insertOne({
        message: 'Task',
        status: STATUS.PENDING
      })
      await request(app)
        .delete(`/api/task/${task.insertedId.toString()}`)
        .expect(204)
    })

    test('should return 404 if not found a task', async () => {
      await request(app)
        .delete(`/api/task/65cba4decf11db8558825326`)
        .expect(404)
    })
  })
})
