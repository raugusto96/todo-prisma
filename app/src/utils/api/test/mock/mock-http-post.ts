import { HttpPostParams } from "@/utils/api/protocols/http";
import { faker } from "@faker-js/faker";

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.airline.airline(),
});
