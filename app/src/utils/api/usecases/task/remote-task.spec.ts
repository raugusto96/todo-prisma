import { RemoteTask } from "./remote-task";
import { HttpPostClientSpy } from "../../test/mock-http-client";
import { faker } from "@faker-js/faker";

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
    await sut.task(faker.commerce.productName());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("should call HttpPostClient with the correct data", async () => {
    const message = faker.commerce.productName();
    const data = {
      message,
    };
    const { sut, httpPostClientSpy } = makeSut();
    await sut.task(message);
    expect(httpPostClientSpy.data).toEqual(data);
  });
});
