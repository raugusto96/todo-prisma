import { ToastPosition } from "react-toastify";

export type ToastifyType = "success" | "error" | "warn" | "info";

export interface ToastifyConfigs {
  position: ToastPosition;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  theme: string;
  pauseOnHover: boolean;
}
