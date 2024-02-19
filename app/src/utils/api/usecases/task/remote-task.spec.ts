import { RemoteTask } from "./remote-task";
import { HttpPostClientSpy } from "../../test/mock-http-client";
import { faker } from "@faker-js/faker";
import { mockTask } from "../../test/mock/mock-remote-task";

const makeHttpPostClientSpy = () => new HttpPostClientSpy();

interface SutTypes {
  sut: RemoteTask;
  httpPostClientSpy: HttpPostClientSpy;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = makeHttpPostClientSpy();
  const sut = new RemoteTask(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteTask", () => {
  test("should call HttpPostClient with the correct url", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.task(mockTask());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("should call HttpPostClient with the correct body", async () => {
    const taskParams = mockTask();
    const { sut, httpPostClientSpy } = makeSut();
    await sut.task(taskParams);
    expect(httpPostClientSpy.body).toEqual(taskParams);
  });
});
