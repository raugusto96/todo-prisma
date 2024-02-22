export interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  name: string;
  value: string;
  id: string;
  labelText?: string;
  styles?: object;
}
