import { useTask } from "@/presentation/context/task-context";
import { Button } from "../button/Button";
import { CardTitle, CardWrapper } from "./Card.styles";
import { CardProps } from "./protocols/card";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useCallback, MouseEvent, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { UpdateTask } from "@/utils/api/usecases/protocols";
import { TaskStatus } from "@/utils/api/usecases/models";
import Status from "./status/Status";

const Card: React.FC<CardProps> = ({ task, styles, ...props }) => {
  const { fetchDeleteTask, setTaskToUpdate } = useTask();

  const [taskUpdated, setTaskUpdated] = useState<
    UpdateTask.Model | undefined
  >();

  const updateHandler = useCallback(
    (event: MouseEvent<HTMLButtonElement>, { id, message }) => {
      event.preventDefault();
      const { name } = event.currentTarget;
      setTaskUpdated({
        id,
        message,
        status: name.toUpperCase() as TaskStatus,
      });
      setTaskToUpdate({
        id,
        message,
        status: name.toUpperCase() as TaskStatus,
      });
    },
    [taskUpdated]
  );

  return (
    <CardWrapper style={styles} {...props}>
      <CardTitle>{task.message}</CardTitle>
      <Status label={task.status} icon={GoDotFill} />
      <Button
        styles={{ width: "50px" }}
        clickHandler={(event: MouseEvent<HTMLButtonElement>) => {
          updateHandler(event, { id: task.id, message: task.message });
        }}
        displayValue={""}
        isIconCheck={true}
        name='done'
        icon={FaCheck}
      />
      <Button
        clickHandler={(event: MouseEvent<HTMLButtonElement>) => {
          updateHandler(event, { id: task.id, message: task.message });
        }}
        styles={{ width: "50px" }}
        displayValue={""}
        name='canceled'
        isIconCancel={true}
        icon={FaXmark}
      />
      <Button
        clickHandler={() => {
          fetchDeleteTask(task.id);
        }}
        styles={{ width: "50px" }}
        displayValue={""}
        name='delete'
        icon={FaTrash}
      />
    </CardWrapper>
  );
};

export default Card;
