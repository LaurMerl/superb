type SuccessResponse<T> = {
  data: T;
};

type ErrorResponse = {
  message: string;
};

export type IResponse<T> = SuccessResponse<T> | ErrorResponse;
