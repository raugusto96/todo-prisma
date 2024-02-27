import { createContext, useContext } from "react";
import { TaskContextType } from "./protocols/context";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error(
      "useTask precisa ser usado em conjunto com um TaskProvider"
    );
  return context;
};

export default TaskContext;
