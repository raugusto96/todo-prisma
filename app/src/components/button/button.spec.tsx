import { fireEvent, render, screen } from "../../utils/test/test-utils"
import { Button } from "./Button"
import { ButtonProps } from "./protocols/button"

const makeSut = (props: ButtonProps) => {  
  return (
    <Button {...props} />
  )
}

describe('Button Component', () => {
  test('should render the component', () => {
    const sut = makeSut({} as ButtonProps)
    render(sut)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  test('should render returns a button element with correct display value is provided', () => {
    const sut = makeSut({
      displayValue: 'any_value',
      clickHandler: () => []
    })
    render(sut)
    const button = screen.getByText('any_value')

    expect(button).toBeInTheDocument()
  })

  test('should button is clickable', () => {
    const sut = makeSut({
      displayValue: 'any_value',
      clickHandler: () => []
    })
    render(sut)
    const button = screen.getByRole('button')

    const isClicked = fireEvent.click(button)
    
    expect(isClicked).toBeTruthy()
  })

  test('should button click handler calls correct function', () => {
    const someFunction = vi.fn()
    const sut = makeSut({
      displayValue: 'any_value',
      clickHandler: someFunction
    })
    render(sut)
    const button = screen.getByRole('button')

    fireEvent.click(button)
    
    expect(someFunction).toHaveBeenCalled()
  })
})