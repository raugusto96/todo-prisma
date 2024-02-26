import { toast } from "react-toastify";
import { ToastifyConfigs, ToastifyType } from "./protocols/toast";

export class ReactToastifyAdapter {
  constructor(
    private readonly toastifyConfigs: ToastifyConfigs,
    private readonly toastifyType: ToastifyType
  ) {}

  notify(message: string): void {
    switch (this.toastifyType) {
      case "success":
        toast.success(message, this.toastifyConfigs);

        break;

      default:
        break;
    }
  }
}
