import React from "react";
import { Input, Label } from "./Text.styles";
import { InputTextProps } from "../protocols";

const Text: React.FC<InputTextProps> = ({
  placeholder,
  id,
  name,
  value,
  labelText,
  styles,
}) => {
  return (
    <Label htmlFor={id}>
      {labelText}
      <Input
        style={styles}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
      />
    </Label>
  );
};

export default Text;
