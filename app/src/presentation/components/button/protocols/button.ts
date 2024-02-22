import React from "react";
import { IconType } from "react-icons";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  displayValue: string;
  clickHandler: (e: any) => void;
  name: string;
  styles?: object;
  type?: "button" | "submit" | "reset";
  icon: IconType;
  isIconCheck?: boolean;
  isIconCancel?: boolean;
}
