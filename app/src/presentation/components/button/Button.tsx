import React from "react";
import { ButtonProps } from "./protocols/button";
import { ButtonWrapper } from "./Button.styles";

export const Button: React.FC<ButtonProps> = ({
  displayValue,
  clickHandler,
  name,
  styles,
  type = "button",
  icon,
  isIconCheck,
  isIconCancel,
  ...props
}) => {
  return (
    <ButtonWrapper
      isIconCheck={isIconCheck}
      isIconCancel={isIconCancel}
      {...props}
      style={styles}
      onClick={clickHandler}
      name={name}
      type={type}
    >
      {displayValue && displayValue}
      {icon && React.createElement(icon)}
    </ButtonWrapper>
  );
};
