import { Id, toast } from "react-toastify";
import { Notifier, ToastifyConfigs, ToastifyType } from "./protocols/toast";

export class ReactToastifyAdapter implements Notifier {
  constructor(private readonly toastifyConfigs: ToastifyConfigs) {}

  notify(message: string, toastifyType: ToastifyType): Id {
    switch (toastifyType) {
      case "warn":
        return toast.warn(message, this.toastifyConfigs);
      case "error":
        return toast.error(message, this.toastifyConfigs);
      case "info":
        return toast.info(message, this.toastifyConfigs);
      default:
        return toast.success(message, this.toastifyConfigs);
    }
  }
}
