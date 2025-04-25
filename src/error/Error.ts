export default interface InternalErrorData {
  error?: {
    message?: string;
  };
}

export default interface Error {
  message: string;
  response?: {
    status?: number;
    data?: string | InternalErrorData;
  };
}
