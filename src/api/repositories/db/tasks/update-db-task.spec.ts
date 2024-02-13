import { Task } from '@prisma/client'
import { LoadDbTaskRepository } from '../usecases/load-task'
import { UpdateTaskDbRepository } from './update-db-task'
import { UpdateTaskDTO } from '../../../models/dtos'
import { MongoHelper } from '../../../utils/helpers/mongo-helper'
import env from '../../../config/env'
import { Collection, ObjectId } from 'mongodb'

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
  sut: UpdateTaskDbRepository
  loadTaskDbRepositoryStub: LoadDbTaskRepository
}

const makeSut = (): SutTypes => {
  const loadTaskDbRepositoryStub = makeLoadTaskDbRepositoryStub()
  const sut = new UpdateTaskDbRepository(loadTaskDbRepositoryStub)
  return {
    sut,
    loadTaskDbRepositoryStub
  }
}

const makeFakeData = (): UpdateTaskDTO => ({
  message: 'any_updated_message',
  status: 'any_updated_status'
})

let taskCollection: Collection

describe('UpdateDbTaskRepository', () => {
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
    await sut.update(task.insertedId.toString(), makeFakeData())
    expect(loadSpy).toHaveBeenCalledWith(task.insertedId.toString())
  })

  test('should returns null if LoadDbTaskRepository not found an task with id', async () => {
    const { sut, loadTaskDbRepositoryStub } = makeSut()
    jest
      .spyOn(loadTaskDbRepositoryStub, 'load')
      .mockReturnValueOnce(Promise.resolve(null))
    const task = await sut.update('any_valid_id', makeFakeData())
    expect(task).toBeNull()
  })

  test('should returns an updated task on success', async () => {
    const { sut } = makeSut()
    const data = makeFakeData()
    const task = await taskCollection.insertOne({
      message: 'any_message',
      status: 'any_status'
    })
    const objectId = new ObjectId(task.insertedId)
    await taskCollection.findOneAndUpdate(
      {
        _id: objectId
      },
      {
        $set: { message: data.message, status: data.status }
      }
    )
    const updatedTask = await sut.update(
      task.insertedId.toString(),
      makeFakeData()
    )
    expect(updatedTask).toEqual({
      id: task.insertedId.toString(),
      message: 'any_updated_message',
      status: 'any_updated_status'
    })
  })
})
