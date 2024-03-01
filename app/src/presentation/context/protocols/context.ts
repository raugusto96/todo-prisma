import { GetTask, UpdateTask } from "@/utils/api/usecases/protocols";

export interface TaskContextType {
  tasks: GetTask.Model[];
  setTaskMessage: React.Dispatch<React.SetStateAction<string>>;
  setTaskToUpdate: React.Dispatch<React.SetStateAction<UpdateTask.Model>>;
  fetchAddTask: () => Promise<void>;
  fetchGetTask: () => Promise<void>;
  fetchDeleteTask: (taskId: string) => Promise<void>;
  fetchUpdateTask: (taskId: string) => Promise<void>;
}
