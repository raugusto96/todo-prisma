import { faker } from "@faker-js/faker";
import { RemoteTask } from "./remote-task";
import { HttpPostClientSpy } from "@/utils/api/test/mock-http-client";
import { mockTask } from "@/utils/api/test/mock/mock-remote-task";
import { UnexpectedError } from "@/utils/api/errors/unexpected-error";
import { HttpStatusCode } from "@/utils/api/protocols/http";

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

  test("should throw UnexpectedError if HttpPostClient returns 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.task(mockTask());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpPostClient returns 404", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.task(mockTask());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
