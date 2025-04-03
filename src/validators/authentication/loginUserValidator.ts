import express from "express";
import { ValidatorErrorResponse } from "../../helpers/responseHandler";
import Validator from "fastest-validator";

const schema = {
  email: {
    type: "email",
    required: true,
  },
  password: {
    type: "string",
    min: 6,
  },
};

const v = new Validator({
  messages: {
    required: "This field is required!",
    string: "This field must be a string.",
    email: "Invalid email format.",
  },
});

const loginUserValidator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const result = await v.validate(req.body, schema);

    if (result !== true) {
      const errors = result.map((err) => ({
        field: err.field || "unknown",
        message: err.message,
      }));
      ValidatorErrorResponse(res, "Validation failed", errors);
      return;
    }

    next();
  } catch (error) {
    ValidatorErrorResponse(
      res,
      "Validation error",
      "An unexpected error occurred"
    );
    return;
  }
};

export default loginUserValidator;
