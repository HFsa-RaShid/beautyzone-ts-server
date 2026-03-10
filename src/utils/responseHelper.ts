import { Response } from 'express';

export const sendSuccess = (res: Response, data: any = null, message: string = "Success") => {
  const response: any = { status: "success", message };
  if (data !== null) response.data = data;
  res.status(200).send(response);
};

export const sendError = (res: Response, error: any, statusCode: number = 500) => {
  const message = error.message || error || "Something went wrong";
  res.status(statusCode).send({ status: "error", message });
};