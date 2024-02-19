import { TaskParams } from "../../usecases/protocols/task";
import { faker } from "@faker-js/faker";

export const mockTask = (): TaskParams => ({
  message: faker.commerce.productName(),
});
