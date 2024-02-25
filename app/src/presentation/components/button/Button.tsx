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
      is_icon_check={isIconCheck?.toString()}
      is_icon_cancel={isIconCancel?.toString()}
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
