import { Task } from '@prisma/client'
import { LoadDbTaskRepository } from '../usecases/load-task'
import { MongoHelper } from '../../../utils/helpers/mongo-helper'
import env from '../../../config/env'
import { Collection, ObjectId } from 'mongodb'
import { DeleteTaskDbRepository } from './delete-db-task'

const makeLoadTaskDbRepositoryStub = () => {
  class LoadTaskDbRepository implements LoadDbTaskRepository {
    async load(taskId: string): Promise<Task | null> {
      return Promise.resolve({
        id: 'any_valid_id',
        message: 'any_valid_message',
        status: 'any_valid_status'
      })
    }
  }
  return new LoadTaskDbRepository()
}

interface SutTypes {
  sut: DeleteTaskDbRepository
  loadTaskDbRepositoryStub: LoadDbTaskRepository
}

const makeSut = (): SutTypes => {
  const loadTaskDbRepositoryStub = makeLoadTaskDbRepositoryStub()
  const sut = new DeleteTaskDbRepository(loadTaskDbRepositoryStub)
  return {
    sut,
    loadTaskDbRepositoryStub
  }
}

let taskCollection: Collection

describe('DeleteDbTaskRepository', () => {
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

  test('should calls LoadDbTaskRepository with correct value', async () => {
    const { sut, loadTaskDbRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadTaskDbRepositoryStub, 'load')
    const task = await taskCollection.insertOne({
      message: 'any_message',
      status: 'any_status'
    })
    await sut.delete(task.insertedId.toString())
    expect(loadSpy).toHaveBeenCalledWith(task.insertedId.toString())
  })

  test('should delete a task on success', async () => {
    const { sut } = makeSut()
    const tasks = await taskCollection.insertMany([
      {
        message: 'any_message',
        status: 'any_status'
      },
      {
        message: 'any_message',
        status: 'any_status'
      }
    ])
    await sut.delete(tasks.insertedIds[0].toString())
    const updatedTasks = await taskCollection.find().toArray()
    expect(updatedTasks).toHaveLength(1)
  })
})
