import React, { useState, useCallback, ChangeEvent, MouseEvent } from "react";
import base from "@/config/base";
import { FormWrapper } from "./Form.styles";
import { FormProps } from "./protocols/form";
import Text from "@/presentation/components/input/text/Text";
import { Button } from "@/presentation/components/button/Button";
import { AxiosHttpAdapter } from "@/utils/api/http/axios-http-adapter/axios-http-adapter";
import { HttpStatusCode } from "@/utils/api/protocols/http";
import { ReactToastifyAdapter } from "@/utils/toastify/react-toastify-adapter";
import { UnexpectedError } from "@/utils/api/errors";

const Form: React.FC<FormProps> = ({ ...props }) => {
  const [taskInput, setTaskInput] = useState<string>("");

  const textHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setTaskInput(value);
    },
    [taskInput]
  );

  const fetchData = useCallback(async () => {
    const reactToastifyAdapter = new ReactToastifyAdapter({
      autoClose: 5000,
      closeOnClick: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: "top-right",
      theme: "colored",
    });
    try {
      const axiosHttpAdapter = new AxiosHttpAdapter();
      const { statusCode } = await axiosHttpAdapter.request({
        method: "post",
        url: `${base.api.url}/task`,
        body: {
          message: taskInput,
        },
      });
      switch (statusCode) {
        case HttpStatusCode.ok:
          reactToastifyAdapter.notify("Tarefa criada com sucesso", "success");
          break;

        default:
          throw new UnexpectedError();
      }
    } catch (error) {
      reactToastifyAdapter.notify(error.message, "error");
    }
  }, [taskInput]);

  const clickHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      fetchData();
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
