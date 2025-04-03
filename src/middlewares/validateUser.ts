import express from "express";
import { get, merge } from "lodash";

// import { getUserBySessionToken } from "../db/users";
import getUserBySessionToken from "../services/users/getUserBySessionToken";
import { ErrorResponse } from "../helpers/responseHandler";

export const validateUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken =
      req.cookies["sessionToken"] || req.headers.authorization.split(" ")[1];
    if (!sessionToken) {
      ErrorResponse(res, "User is unauthenticated", "Couldn't get user", 401);
      return;
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      ErrorResponse(res, "User is unauthenticated", "Couldn't get user", 401);
      return;
    }
    merge(req, { identity: user });

    next();
  } catch (error) {
    console.error(error);
  }
};
