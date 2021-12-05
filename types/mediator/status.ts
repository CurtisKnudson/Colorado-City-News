export enum MediatorStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface ResponseStatus {
  status: string;
  message: string;
}
