import React from "react";
import { ButtonProps } from "./protocols/button";
import { ButtonWrapper } from './Button.styles';

export const Button: React.FC<ButtonProps> = ({
  displayValue,
  clickHandler,
}) => {
  return (
    <ButtonWrapper
      onClick={clickHandler}
    >
      {displayValue}
    </ButtonWrapper>
  )
}