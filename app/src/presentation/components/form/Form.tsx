import React, { useCallback, ChangeEvent, MouseEvent, useState } from "react";
import { FormWrapper } from "./Form.styles";
import { FormProps } from "./protocols/form";
import Text from "@/presentation/components/input/text/Text";
import { Button } from "@/presentation/components/button/Button";
import { useTask } from "@/presentation/context/task-context";

const Form: React.FC<FormProps> = ({ ...props }) => {
  const { setTaskMessage } = useTask();

  const [taskInput, setTaskInput] = useState<string>("");

  const textHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setTaskInput(value);
    },
    [taskInput]
  );

  const clickHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setTaskMessage(taskInput);
      setTaskInput("");
    },
    [taskInput]
  );

  return (
    <FormWrapper {...props}>
      <Text
        placeholder='Adicione a tarefa'
        id='add-task-input-text'
        name='add-task'
        textHandler={textHandler}
        value={taskInput}
      />
      <Button
        name='add'
        displayValue='Adicionar'
        clickHandler={clickHandler}
        type='submit'
      />
    </FormWrapper>
  );
};

export default Form;
