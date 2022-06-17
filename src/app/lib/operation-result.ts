export enum OperationResultStatus {
  pending = 0,
  progress = 1,
  notFound = 2,
  failed = 3,
  success = 4,
}

export class OperationResult<T> {
  data?: T;
  message?: string;
  status: OperationResultStatus = OperationResultStatus.pending;

  static Success<T>(data?: T): OperationResult<T> {
    const result = new OperationResult<T>();
    result.data = data;
    result.status = OperationResultStatus.success;
    return result;
  }

  static Failed<T>(err?: Error): OperationResult<T> {
    const result = new OperationResult<T>();
    result.message = err?.message;
    result.status = OperationResultStatus.failed;
    return result;
  }
}
