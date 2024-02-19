import { faker } from "@faker-js/faker";
import { TaskParams } from "@/utils/api/usecases/protocols/task";

export const mockTask = (): TaskParams => ({
  message: faker.commerce.productName(),
});
