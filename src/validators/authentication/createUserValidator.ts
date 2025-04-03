import express from "express";
import { ValidatorErrorResponse } from "../../helpers/responseHandler";
import Validator from "fastest-validator";

const schema = {
  username: {
    type: "string",
    min: 5,
  },
  email: {
    type: "email",
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
    stringMin: "This field must be at least {expected} characters.",
    email: "Invalid email format.",
  },
});

const createUserValidator = async (
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

export default createUserValidator;
