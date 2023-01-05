export enum STATUS {
  SUCCESS = "success",
  ERROR = "error",
}

export type ErrorResponse = {
  status: string;
  message: string;
};
