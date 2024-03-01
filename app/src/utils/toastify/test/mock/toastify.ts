import { faker } from "@faker-js/faker";
import { ToastifyConfigs } from "../../protocols/toast";

export const mockMessage = () => faker.lorem.words();

export const mockConfigs = (): ToastifyConfigs => ({
  position: "top-right",
  autoClose: Number(faker.number.octal()),
  closeOnClick: faker.datatype.boolean(),
  pauseOnHover: faker.datatype.boolean(),
  theme: faker.color.human(),
  hideProgressBar: faker.datatype.boolean(),
});
