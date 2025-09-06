export interface IResponse<T> {
  time: string;
  code: number;
  path: string;
  status: string;
  message: string;
  exception: string;
  data: T;
}
