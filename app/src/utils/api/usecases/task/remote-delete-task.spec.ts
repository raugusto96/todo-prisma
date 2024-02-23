import { faker } from "@faker-js/faker";
import { HttpClientSpy, mockDeleteParams } from "../../test/mock";
import { RemoteDeleteTask } from "./remote-delete-task";

const makeHttpClientSpy = () => new HttpClientSpy();

interface SutTypes {
  sut: RemoteDeleteTask;
  httpClientSpy: HttpClientSpy;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = makeHttpClientSpy();
  const sut = new RemoteDeleteTask(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteDeleteTask", () => {
  test("should call HttpClient with the correct url and verb", async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    await sut.delete(mockDeleteParams());
    expect(httpClientSpy.url).toBe(url);
  });

  test("should call HttpClient with the headers params", async () => {
    const params = mockDeleteParams();
    const { sut, httpClientSpy } = makeSut();
    await sut.delete(params);
    expect(httpClientSpy.headers.params).toEqual(params);
  });
});
