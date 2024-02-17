import { render, screen } from "../../utils/test/test-utils"
import { Button } from "./Button"

describe('Button Component', () => {
  test('should render the component', () => {
    const displayValue = 'any_value'
    render(<Button
      displayValue={displayValue}
    />)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  test('should render returns a button element with correct display value is provided', () => {
    const displayValue = 'any_value'
    render(<Button
      displayValue={displayValue}
    />)
    const button = screen.getByText('any_value')

    expect(button).toBeInTheDocument()
  })
})