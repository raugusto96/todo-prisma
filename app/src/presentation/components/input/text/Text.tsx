import React from "react";
import { Input, Label } from "./Text.styles";
import { InputTextProps } from "../protocols";

const Text: React.FC<InputTextProps> = () => {
  return (
    <Label>
      Tarefa
      <Input placeholder='Adicione a tarefa' />
    </Label>
  );
};

export default Text;
