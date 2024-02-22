import React from "react";
import { ButtonProps } from "./protocols/button";
import { ButtonWrapper } from "./Button.styles";

export const Button: React.FC<ButtonProps> = ({
  displayValue,
  clickHandler,
  name,
  styles,
  type = "button",
}) => {
  return (
    <ButtonWrapper
      style={styles}
      onClick={clickHandler}
      name={name}
      type={type}
    >
      {displayValue}
    </ButtonWrapper>
  );
};
