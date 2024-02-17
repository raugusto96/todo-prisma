import { fireEvent, render, screen } from "../../utils/test/test-utils"
import { Button } from "./Button"
import { ButtonProps } from "./protocols/button"

const makeSut = () => {
  const props: ButtonProps = {
    displayValue: 'any_value'
  }
  
  return (
    <Button {...props} />
  )
}

describe('Button Component', () => {
  test('should render the component', () => {
    const sut = makeSut()
    render(sut)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  test('should render returns a button element with correct display value is provided', () => {
    const sut = makeSut()
    render(sut)
    const button = screen.getByText('any_value')

    expect(button).toBeInTheDocument()
  })

  test('should button is clickable', () => {
    const sut = makeSut()
    render(sut)
    const button = screen.getByRole('button')

    const isClicked = fireEvent.click(button)
    
    expect(isClicked).toBeTruthy()
  })
})