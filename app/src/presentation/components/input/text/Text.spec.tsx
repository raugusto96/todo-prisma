import { render, screen } from "@/utils/test/test-utils";
import InputText from "./Text";
import { InputTextProps } from "../protocols";

const makeSut = (props: InputTextProps) => {
  return <InputText {...props} />;
};

describe("Input Component", () => {
  test("should render the input component", () => {
    const sut = makeSut({
      placeholder: "Adicione a tarefa",
    });
    render(sut);
    const input = screen.getByPlaceholderText("Adicione a tarefa");

    expect(input).toBeInTheDocument();
  });
});
