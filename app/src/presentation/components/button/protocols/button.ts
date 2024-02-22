export interface ButtonProps {
  displayValue: string;
  clickHandler: (e: any) => void;
  name: string;
  styles?: object;
  type?: "button" | "submit" | "reset";
}
