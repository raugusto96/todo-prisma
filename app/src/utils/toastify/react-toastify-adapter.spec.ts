import { faker } from "@faker-js/faker";
import { ToastifyConfigs, ToastifyType } from "./protocols/toast";
import { toast } from "react-toastify";
import { ReactToastifyAdapter } from "./react-toastify-adapter";

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
    const message = faker.lorem.words();
    const configs: ToastifyConfigs = {
      position: "top-right",
      autoClose: Number(faker.number.octal()),
      closeOnClick: faker.datatype.boolean(),
      pauseOnHover: faker.datatype.boolean(),
      theme: faker.color.human(),
      hideProgressBar: faker.datatype.boolean(),
    };
    const toastifyType: ToastifyType = "success";
    const { sut, mockedToast } = makeSut(configs, toastifyType);
    sut.notify(message);
    expect(mockedToast.success).toHaveBeenCalledWith(message, configs);
  });
});
