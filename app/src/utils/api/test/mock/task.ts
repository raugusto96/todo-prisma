import { faker } from "@faker-js/faker";
import { AddTask, GetTask, UpdateTask } from "@/utils/api/usecases/protocols";
import { TaskStatus } from "@/utils/api/usecases/models/add-task";

export const mockTask = (): AddTask.Params => ({
  message: faker.commerce.productName(),
});

export const mockTaskModel = (): AddTask.Model => ({
  id: faker.database.mongodbObjectId(),
  message: faker.lorem.words(),
  status: TaskStatus.pending,
});

export const mockUpdateParams = (): UpdateTask.Params => ({
  body: {
    message: faker.commerce.product(),
    status: faker.company.buzzNoun(),
  },
});

export const mockUpdateResponse = (): UpdateTask.Model => ({
  id: faker.database.mongodbObjectId(),
  message: faker.animal.bear(),
  status: TaskStatus.done,
});

export const mockGetParams = (): GetTask.Params => ({
  headers: {
    params: {
      message: faker.animal.bird(),
      status: faker.color.human(),
    },
  },
});

export const mockGetResult = (): GetTask.Model => ({
  id: faker.database.mongodbObjectId(),
  message: faker.color.space(),
  status: TaskStatus.pending,
});
