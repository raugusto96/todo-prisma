import React from "react";
import { ButtonProps } from "./protocols/button";
import { ButtonWrapper } from './Button.styles';

export const Button: React.FC<ButtonProps> = ({
  displayValue,
  clickHandler,
  name,
}) => {
  return (
    <ButtonWrapper
      onClick={clickHandler}
      name={name}
    >
      {displayValue}
    </ButtonWrapper>
  )
}