import List from "@/presentation/components/list/List";
import Form from "@/presentation/components/form/Form";
import { Container } from "./Task.styles";

const Task: React.FC = () => {
  return (
    <Container>
      <Form />
      <List />
    </Container>
  );
};

export default Task;
