import React, { useCallback, useEffect, useState } from "react";
import TaskContext from "../task-context";
import { TaskProviderProps } from "./protocols/provider";
import { GetTask } from "@/utils/api/usecases/protocols";
import { AxiosHttpAdapter } from "@/utils/api/http/axios-http-adapter/axios-http-adapter";
import { ReactToastifyAdapter } from "@/utils/toastify/react-toastify-adapter";
import base from "@/config/base";
import { HttpStatusCode } from "@/utils/api/protocols/http";
import { UnexpectedError } from "@/utils/api/errors";

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  // Adapters
  const reactToastifyAdapter = new ReactToastifyAdapter({
    autoClose: 5000,
    closeOnClick: true,
    hideProgressBar: false,
    pauseOnHover: true,
    position: "top-right",
    theme: "colored",
  });
  const axiosHttpAdapter = new AxiosHttpAdapter();

  // States
  const [tasks, setTasks] = useState<GetTask.Model[]>([]);
  const [taskMessage, setTaskMessage] = useState("");
  const [taskToUpdate, setTaskToUpdate] = useState<GetTask.Model | undefined>();

  // Callbacks
  const addTask = useCallback(
    ({ message, id, status }): void => {
      const newTask: GetTask.Model = {
        id,
        message,
        status,
      };
      setTasks([...tasks, newTask]);
    },
    [tasks]
  );

  const removeTask = useCallback(
    (taskId: string) => {
      setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
    },
    [tasks]
  );

  const updateTask = useCallback(
    (taskId: string) => {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? taskToUpdate : task
      );
      setTasks(updatedTasks);
    },
    [tasks, taskToUpdate]
  );

  const fetchAddTask = useCallback(async () => {
    try {
      const { statusCode, body } = await axiosHttpAdapter.request({
        method: "post",
        url: `${base.api.url}/task`,
        body: {
          message: taskMessage,
        },
      });
      switch (statusCode) {
        case HttpStatusCode.ok:
          addTask(body);
          setTaskMessage("");
          break;

        default:
          throw new UnexpectedError();
      }
    } catch (error) {
      reactToastifyAdapter.notify(error.message, "error");
    }
  }, [taskMessage]);

  const fetchGetTask = useCallback(async () => {
    try {
      const { statusCode, body } = await axiosHttpAdapter.request({
        method: "get",
        url: `${base.api.url}/task`,
      });
      switch (statusCode) {
        case HttpStatusCode.ok:
          setTasks(body);
          break;
        case HttpStatusCode.noContent:
          break;

        default:
          throw new UnexpectedError();
      }
    } catch (error) {
      reactToastifyAdapter.notify(error.message, "error");
    }
  }, [taskMessage]);

  const fetchDeleteTask = useCallback(async (taskId: string) => {
    try {
      const { statusCode } = await axiosHttpAdapter.request({
        method: "delete",
        url: `${base.api.url}/task/${taskId}`,
      });
      switch (statusCode) {
        case HttpStatusCode.noContent:
          removeTask(taskId);
          reactToastifyAdapter.notify("Tarefa removida com sucesso", "success");
          break;

        default:
          throw new UnexpectedError();
      }
    } catch (error) {
      reactToastifyAdapter.notify(error.message, "error");
    }
  }, []);

  const fetchUpdateTask = useCallback(
    async (taskId: string) => {
      try {
        const { statusCode } = await axiosHttpAdapter.request({
          method: "put",
          url: `${base.api.url}/task/${taskId}`,
          body: taskToUpdate,
        });
        switch (statusCode) {
          case HttpStatusCode.ok:
            updateTask(taskId);
            setTaskToUpdate(undefined);
            reactToastifyAdapter.notify(
              "Tarefa atualizada com sucesso",
              "success"
            );
            break;

          default:
            throw new UnexpectedError();
        }
      } catch (error) {
        reactToastifyAdapter.notify(error.message, "error");
      }
    },
    [taskToUpdate]
  );

  // Effects
  useEffect(() => {
    if (taskMessage) fetchAddTask();
  }, [taskMessage]);

  useEffect(() => {
    fetchGetTask();
  }, []);

  useEffect(() => {
    if (taskToUpdate) fetchUpdateTask(taskToUpdate.id);
  }, [taskToUpdate]);

  const providerValue = {
    tasks,
    fetchAddTask,
    fetchGetTask,
    fetchDeleteTask,
    fetchUpdateTask,
    setTaskMessage,
    setTaskToUpdate,
  };

  return (
    <TaskContext.Provider value={providerValue}>
      {children}
    </TaskContext.Provider>
  );
};
