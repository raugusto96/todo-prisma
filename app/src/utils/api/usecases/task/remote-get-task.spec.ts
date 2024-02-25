import { HttpClientSpy } from "../../test/mock";
import { faker } from "@faker-js/faker";
import { GetTask } from "../protocols/get-task";
import { RemoteGetTask } from "./remote-get-task";

interface SutTypes {
  sut: RemoteGetTask;
  httpClientSpy: HttpClientSpy;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteGetTask(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteGetTask", () => {
  test("should call HttpClient with correct url and verb", () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    sut.get({} as GetTask.Params);
    expect(httpClientSpy.url).toBe(url);
  });
});
