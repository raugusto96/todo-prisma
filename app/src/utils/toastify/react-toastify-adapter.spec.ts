import { faker } from "@faker-js/faker";
import { ToastifyConfigs, ToastifyType } from "./protocols/toast";
import { toast } from "react-toastify";
import { ReactToastifyAdapter } from "./react-toastify-adapter";

vi.mock("react-toastify");

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
    const sut = new ReactToastifyAdapter(configs, toastifyType);
    sut.notify(message);
    const mockedToast = toast as jest.Mocked<typeof toast>;
    expect(mockedToast.success).toHaveBeenCalledWith(message, configs);
  });
});
