import { CreateTaskDTO } from '../../../models/dtos'
import { STATUS, Task } from '../../../models/usecases'
import { MongoHelper } from '../../../utils/helpers/mongo-helper'
import { AddDbTaskRepository } from '../usecases/add-task'

export class AddTaskDbRepository implements AddDbTaskRepository {
  async add(taskData: CreateTaskDTO): Promise<Task> {
    const taskCollection = await MongoHelper.getCollection('tasks')
    const task = {
      ...taskData,
      status: STATUS.PENDING
    }
    const createdTask = await taskCollection.insertOne(task)
    return MongoHelper.map({ ...task, _id: createdTask.insertedId })
  }
}
