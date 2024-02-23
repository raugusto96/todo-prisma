import { faker } from "@faker-js/faker";
import { TaskParams } from "@/utils/api/usecases/protocols/add-task";
import { TaskModel, TaskStatus } from "../../usecases/models/add-task";

export const mockTask = (): TaskParams => ({
  message: faker.commerce.productName(),
});

export const mockTaskModel = (): TaskModel => ({
  id: faker.database.mongodbObjectId(),
  message: faker.lorem.words(),
  status: TaskStatus.pending,
});
