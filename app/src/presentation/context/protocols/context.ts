import { GetTask } from "@/utils/api/usecases/protocols";

export interface TaskContextType {
  tasks: GetTask.Model[];
  setTaskMessage: React.Dispatch<React.SetStateAction<string>>;
  fetchAddTask: () => Promise<void>;
  fetchGetTask: () => Promise<void>;
  fetchDeleteTask: (taskId: string) => Promise<void>;
}
