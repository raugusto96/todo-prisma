import { Button } from '@/presentation/components/button/Button'
import { Container } from './Task.styles'

const Task: React.FC = () => {
  return (
    <Container>
      <Button
        name='add'
        displayValue='Adicionar'
        clickHandler={(event) => { console.log(event.target)}}
      />
    </Container>
  )
}

export default Task