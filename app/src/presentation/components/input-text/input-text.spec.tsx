import { render, screen } from "@/utils/test/test-utils"
import InputText from "./Input-text"

describe('Input Component', () => {
  test('should render the input component', () => {
    const sut = <InputText />
    render(sut)
    const input = screen.getByPlaceholderText('Adicione a tarefa')

    expect(input).toBeInTheDocument()
  })
})