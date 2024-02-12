export enum STATUS {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  DONE = 'DONE'
}

export interface Task {
  id: string
  message: string
  status: STATUS
}
