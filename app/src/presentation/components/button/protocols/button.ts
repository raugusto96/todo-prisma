import React, { MouseEvent } from "react";
import { IconType } from "react-icons";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  displayValue: string;
  clickHandler: (e: MouseEvent<HTMLButtonElement>) => void;
  name: string;
  styles?: object;
  type?: "button" | "submit" | "reset";
  icon?: IconType;
  isIconCheck?: boolean;
  isIconCancel?: boolean;
}
