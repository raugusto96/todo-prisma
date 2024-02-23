import { faker } from "@faker-js/faker";
import { AddTask } from "@/utils/api/usecases/protocols/add-task";
import { TaskStatus } from "../../usecases/models/add-task";
import { DeleteTask } from "../../usecases/protocols";

export const mockTask = (): AddTask.Params => ({
  message: faker.commerce.productName(),
});

export const mockTaskModel = (): AddTask.Model => ({
  id: faker.database.mongodbObjectId(),
  message: faker.lorem.words(),
  status: TaskStatus.pending,
});

export const mockDeleteParams = (): DeleteTask.Params => ({
  taskId: faker.database.mongodbObjectId(),
});
