import express from "express";

type ValidationError = {
  field: string;
  message: string;
};
export const SuccessResponse = (
  res: express.Response,
  message: string,
  data: {}
) => {
  return res.status(200).json({
    message,
    data,
    status: "success",
  });
};

export const ValidatorErrorResponse = (
  res: express.Response,
  message: string,
  error: Array<ValidationError> | string
) => {
  return res.status(422).json({
    message,
    error,
    status: "error",
  });
};

export const ErrorResponse = (
  res: express.Response,
  message: string,
  error: string,
  status: number
) => {
  return res.status(status).json({
    message,
    error,
    status: "error",
  });
};
