import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  displayValue: string;
  clickHandler: (e: any) => void;
  name: string;
  styles?: object;
  type?: "button" | "submit" | "reset";
}
