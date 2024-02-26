import { faker } from "@faker-js/faker";
import { ToastifyConfigs, ToastifyType } from "./protocols/toast";
import { toast } from "react-toastify";
import { ReactToastifyAdapter } from "./react-toastify-adapter";
import { mockConfigs, mockMessage } from "./test/mock/toastify";

vi.mock("react-toastify");

interface SutTypes {
  sut: ReactToastifyAdapter;
  mockedToast: jest.Mocked<typeof toast>;
}

const makeSut = (configs: ToastifyConfigs, type: ToastifyType): SutTypes => {
  const sut = new ReactToastifyAdapter(configs, type);
  const mockedToast = toast as jest.Mocked<typeof toast>;
  return {
    sut,
    mockedToast,
  };
};

describe("ReactToastifyAdapter", () => {
  test("should call toast success method with correct values", () => {
    const message = mockMessage();
    const configs = mockConfigs();
    const { sut, mockedToast } = makeSut(configs, "success");
    sut.notify(message);
    expect(mockedToast.success).toHaveBeenCalledWith(message, configs);
  });

  test("should call toast error method with correct values", () => {
    const message = mockMessage();
    const configs = mockConfigs();
    const { sut, mockedToast } = makeSut(configs, "error");
    sut.notify(message);
    expect(mockedToast.error).toHaveBeenCalledWith(message, configs);
  });
});
