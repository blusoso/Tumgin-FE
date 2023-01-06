export enum STATUS {
  SUCCESS = "success",
  ERROR = "error",
}

export type ErrorResponse = {
  status: number;
  statusText: string;
  detail: string;
};
