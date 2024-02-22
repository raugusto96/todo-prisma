import React from "react";
import { Input, Label } from "./Text.styles";
import { InputTextProps } from "../protocols";

const Text: React.FC<InputTextProps> = ({ placeholder }) => {
  return (
    <Label>
      Tarefa
      <Input placeholder={placeholder} />
    </Label>
  );
};

export default Text;
