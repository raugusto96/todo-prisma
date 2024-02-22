import { useState } from "react";
import Card from "../card/Card";
import { Container, ListTasks, Title } from "./List.styles";

const List: React.FC = () => {
  const [tasks, setTasks] = useState([
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum a autem debitis molestias excepturi eos cum beatae quaerat praesentium optio, nostrum ut repellat suscipit necessitatibus? Necessitatibus recusandae quaerat molestiae ipsa!",
  ]);
  return (
    <Container>
      <Title>Tarefas</Title>
      <ListTasks>
        {tasks.map((el) => (
          <Card key={el} task={el} />
        ))}
      </ListTasks>
    </Container>
  );
};

export default List;
