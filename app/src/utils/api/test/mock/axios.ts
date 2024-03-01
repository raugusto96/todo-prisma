import axios from "axios";
import { faker } from "@faker-js/faker";

export const mockHttpResponse = (): any => ({
  data: faker.airline.airline(),
  status: faker.number.octal(255),
});

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse());
  return mockedAxios;
};
