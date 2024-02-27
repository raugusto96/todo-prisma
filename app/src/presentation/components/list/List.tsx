import Card from "../card/Card";
import { Container, ListTasks, Title } from "./List.styles";
import { useTask } from "@/presentation/context/task-context";

const List: React.FC = () => {
  const { tasks } = useTask();
  return (
    <Container>
      <Title>Tarefas</Title>
      <ListTasks>
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </ListTasks>
    </Container>
  );
};

export default List;
