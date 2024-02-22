import React from "react";
import { FormWrapper } from "./Form.styles";
import Text from "../input/text/Text";
import { Button } from "../button/Button";

const Form: React.FC = () => {
  return (
    <FormWrapper>
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
    </FormWrapper>
  );
};

export default Form;
