import { Container, Item, ListTasks, Title } from "./List.styles";

const List: React.FC = () => {
  return (
    <Container>
      <Title>Tarefas</Title>
      <ListTasks>
        {[
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum a autem debitis molestias excepturi eos cum beatae quaerat praesentium optio, nostrum ut repellat suscipit necessitatibus? Necessitatibus recusandae quaerat molestiae ipsa!",
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum a autem debitis molestias excepturi eos cum beatae quaerat praesentium optio, nostrum ut repellat suscipit necessitatibus? Necessitatibus recusandae quaerat molestiae ipsa!",
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum a autem debitis molestias excepturi eos cum beatae quaerat praesentium optio, nostrum ut repellat suscipit necessitatibus? Necessitatibus recusandae quaerat molestiae ipsa!",
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum a autem debitis molestias excepturi eos cum beatae quaerat praesentium optio, nostrum ut repellat suscipit necessitatibus? Necessitatibus recusandae quaerat molestiae ipsa!",
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum a autem debitis molestias excepturi eos cum beatae quaerat praesentium optio, nostrum ut repellat suscipit necessitatibus? Necessitatibus recusandae quaerat molestiae ipsa!",
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum a autem debitis molestias excepturi eos cum beatae quaerat praesentium optio, nostrum ut repellat suscipit necessitatibus? Necessitatibus recusandae quaerat molestiae ipsa!",
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum a autem debitis molestias excepturi eos cum beatae quaerat praesentium optio, nostrum ut repellat suscipit necessitatibus? Necessitatibus recusandae quaerat molestiae ipsa!",
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum a autem debitis molestias excepturi eos cum beatae quaerat praesentium optio, nostrum ut repellat suscipit necessitatibus? Necessitatibus recusandae quaerat molestiae ipsa!",
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum a autem debitis molestias excepturi eos cum beatae quaerat praesentium optio, nostrum ut repellat suscipit necessitatibus? Necessitatibus recusandae quaerat molestiae ipsa!",
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum a autem debitis molestias excepturi eos cum beatae quaerat praesentium optio, nostrum ut repellat suscipit necessitatibus? Necessitatibus recusandae quaerat molestiae ipsa!",
        ].map((el) => (
          <Item key={el}>{el}</Item>
        ))}
      </ListTasks>
    </Container>
  );
};

export default List;
