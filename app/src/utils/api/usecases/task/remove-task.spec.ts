import { RemoteTask } from "./remote-task";
import { HttpPostClientSpy } from "../../test/mock-http-client";
import faker from "faker";

const makeHttpPostClientSpy = () => new HttpPostClientSpy();

interface SutTypes {
  sut: RemoteTask;
  httpPostClientSpy: HttpPostClientSpy;
}

const makeSut = (url: string = "any_url"): SutTypes => {
  const httpPostClientSpy = makeHttpPostClientSpy();
  const sut = new RemoteTask(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe("Http Client", () => {
  test("should call HttpPostClient with the correct url", async () => {
    const url = "other_url";
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.task();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
