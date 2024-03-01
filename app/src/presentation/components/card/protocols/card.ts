import { GetTask } from "@/utils/api/usecases/protocols";

export interface CardProps {
  key: string;
  task: GetTask.Model;
  styles?: object;
}
