import { AxiosHttpAdapter } from "./axios-http-adapter";
import { mockAxios, mockHttpRequest } from "@/utils/api/test/mock";
import axios from "axios";

vi.mock("axios");

interface SutTypes {
  sut: AxiosHttpAdapter;
  mockedAxios: jest.Mocked<typeof axios>;
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpAdapter();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe("AxiosHttpClient", () => {
  test("should call axios with correct values", async () => {
    const request = mockHttpRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.request(request);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method,
    });
  });

  test("should return correct response", async () => {
    const { sut, mockedAxios } = makeSut();
    const httpResponse = await sut.request(mockHttpRequest());
    const axiosResponse = await mockedAxios.request.mock.results[0].value;

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });
});
