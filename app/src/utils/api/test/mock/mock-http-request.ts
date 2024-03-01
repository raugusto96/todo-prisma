import { HttpRequest } from "@/utils/api/protocols/http";
import { faker } from "@faker-js/faker";

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.helpers.arrayElement(["get", "post", "put", "delete"]),
  body: faker.airline.airline(),
  headers: faker.airline.airline(),
});
