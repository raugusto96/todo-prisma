import { useTask } from "@/presentation/context/task-context";
import { Button } from "../button/Button";
import { CardWrapper } from "./Card.styles";
import { CardProps } from "./protocols/card";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useCallback, MouseEvent, useState } from "react";
import { UpdateTask } from "@/utils/api/usecases/protocols";
import { TaskStatus } from "@/utils/api/usecases/models";

const Card: React.FC<CardProps> = ({ task, styles, ...props }) => {
  const { fetchDeleteTask, setTaskToUpdate } = useTask();

  const [taskUpdated, setTaskUpdated] = useState<
    UpdateTask.Model | undefined
  >();

  const updateHandler = useCallback(
    (event: MouseEvent<HTMLButtonElement>, { id, message }) => {
      event.preventDefault();
      setTaskUpdated({
        id,
        message,
        status: TaskStatus.done,
      });
      setTaskToUpdate({
        id,
        message,
        status: TaskStatus.done,
      });
    },
    [taskUpdated]
  );

  return (
    <CardWrapper style={styles} {...props}>
      {task.message}
      <Button
        styles={{ width: "50px" }}
        clickHandler={(event: MouseEvent<HTMLButtonElement>) => {
          updateHandler(event, { id: task.id, message: task.message });
        }}
        displayValue={""}
        isIconCheck={true}
        name='done-button'
        icon={FaCheck}
      />
      <Button
        clickHandler={() => {
          fetchDeleteTask(task.id);
        }}
        styles={{ width: "50px" }}
        displayValue={""}
        name='cancel-button'
        isIconCancel={true}
        icon={FaXmark}
      />
    </CardWrapper>
  );
};

export default Card;
