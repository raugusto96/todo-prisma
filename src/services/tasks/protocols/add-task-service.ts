import { CreateTaskDTO } from "../../../models/dtos";
import { Task } from "../../../models/usecases";

export interface CreateTaskService {
  add: (task: CreateTaskDTO) => Promise<Task>
}