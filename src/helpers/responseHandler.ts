import express from "express";

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
