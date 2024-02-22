import React from "react";
import { FormWrapper } from "./Form.styles";
import Text from "../input/text/Text";
import { Button } from "../button/Button";
import { FormProps } from "./protocols/form";

const Form: React.FC<FormProps> = ({ ...props }) => {
  return (
    <FormWrapper {...props}>
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
