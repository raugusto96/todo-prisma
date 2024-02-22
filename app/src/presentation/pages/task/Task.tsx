import { Button } from "@/presentation/components/button/Button";
import { Container } from "./Task.styles";
import Text from "@/presentation/components/input/text/Text";

const Task: React.FC = () => {
  return (
    <Container>
      <Text
        placeholder='Adicione a tarefa'
        id='add-task-input-text'
        name='add-task'
        value={""}
      />
      <Button
        name='add'
        displayValue='Adicionar'
        clickHandler={() => []}
        type='submit'
      />
    </Container>
  );
};

export default Task;
