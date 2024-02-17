import React from "react";
import { ButtonProps } from "./protocols/button";

export const Button: React.FC<ButtonProps> = ({
  displayValue,
  clickHandler,
}) => {
  return (
    <button onClick={clickHandler}>{displayValue}</button>
  )
}