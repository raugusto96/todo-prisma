import { render } from "../../utils/test/test-utils"
import { Button } from "./Button"

describe('Button Component', () => {
  test('should render the component', () => {
    const { container } = render(<Button />)

    expect(container).toBeInTheDocument()
  })
})