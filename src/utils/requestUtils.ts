import { IResponse } from "@/models/response/Response";

export const baseUrl = "http://localhost:8080";

export const isJsonContentType = (headers: Headers) =>
  [
    "application/vnd.api+json",
    "application/json",
    "application/vnd.hal+json",
    "application/pdf",
    "multipart/form-data",
  ].includes(headers.get("content-type")?.trimEnd()!);

export const processResponse = <T>(response: IResponse<T>, _meta: any, _arg: unknown): IResponse<T> => {
  console.log({ response });
  return response;
};

export const processError = (
  error: { status: number; data: IResponse<void> },
  _meta: unknown,
  _arg: unknown
): { status: number; data: IResponse<void> } => {
  console.log({ error });
  return error;
};

export enum Http {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  TRACE = "TRACE",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
}
