import Card from "../card/Card";
import {
  Container,
  DivideLine,
  HeaderItem,
  ListHeader,
  ListTasks,
  Title,
} from "./List.styles";
import { useTask } from "@/presentation/context/task-context";
import { LiaListAlt } from "react-icons/lia";
import { LuLoader } from "react-icons/lu";
import { TbClick } from "react-icons/tb";

const List: React.FC = () => {
  const { tasks } = useTask();
  return (
    <Container>
      <ListTasks>
        <ListHeader>
          <HeaderItem>
            <LiaListAlt />
            Tarefa
          </HeaderItem>
          <HeaderItem>
            <LuLoader />
            Status
          </HeaderItem>
          <HeaderItem>
            <TbClick />
            Finalizar
          </HeaderItem>
          <HeaderItem>
            <TbClick />
            Cancelar
          </HeaderItem>
          <HeaderItem>
            <TbClick />
            Remover
          </HeaderItem>
        </ListHeader>
        <DivideLine />
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </ListTasks>
    </Container>
  );
};

export default List;
