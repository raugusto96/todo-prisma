import { render, screen } from "../../utils/test/test-utils"
import { Button } from "./Button"

describe('Button Component', () => {
  test('should render the component', () => {
    render(<Button />)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  // test('should render returns a button element', () => {
  //   const { container } = render(<Button />)

  //   expect(container).toBe
  // })
})