import { Button } from "@/presentation/components/button/Button";
import { Container } from "./Task.styles";
import Text from "@/presentation/components/input/text/Text";

const Task: React.FC = () => {
  return (
    <Container>
      <Text placeholder='Adicione a tarefa' />
      <Button name='add' displayValue='Adicionar' clickHandler={() => []} />
    </Container>
  );
};

export default Task;
