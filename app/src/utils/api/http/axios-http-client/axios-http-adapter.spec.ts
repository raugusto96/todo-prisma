import { AxiosHttpAdapter } from "./axios-http-adapter";
import { mockAxios } from "@/utils/api/test/mock";
import { mockPostRequest } from "@/utils/api/test/mock";
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
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test("should return the correct statusCode and body", () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[1].value);
  });
});
