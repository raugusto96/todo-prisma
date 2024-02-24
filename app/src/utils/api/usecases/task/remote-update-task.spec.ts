import { faker } from "@faker-js/faker";
import { HttpClientSpy } from "../../test/mock";
import { RemoteUpdateTask } from "./remote-update-task";
import { UpdateTask } from "../protocols/update-task";

const makeHttpClientSpy = (): HttpClientSpy => new HttpClientSpy();

interface SutTypes {
  sut: RemoteUpdateTask;
  httpClientSpy: HttpClientSpy;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = makeHttpClientSpy();
  const sut = new RemoteUpdateTask(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteUpdateTask", () => {
  test("should call HttpClient with correct url and verb", () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    sut.update({} as UpdateTask.Params);
    expect(httpClientSpy.url).toBe(url);
  });
});
