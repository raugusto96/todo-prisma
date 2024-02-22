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
  ...props
}) => {
  return (
    <Label htmlFor={id}>
      {labelText}
      <Input
        {...props}
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
