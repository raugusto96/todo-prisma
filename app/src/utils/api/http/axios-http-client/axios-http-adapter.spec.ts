import { AxiosHttpAdapter } from "./axios-http-adapter";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { HttpPostParams } from "../../protocols/http";

vi.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedAxiosResult = {
  data: faker.airline.airline(),
  status: faker.number.octal(255),
};

mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const makeSut = (): AxiosHttpAdapter => new AxiosHttpAdapter();

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.airline.airline(),
});

describe("AxiosHttpClient", () => {
  test("should call axios with correct values", async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test("should return the correct statusCode and body", async () => {
    const sut = makeSut();
    const httpResponse = await sut.post(mockPostRequest());
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });
});
