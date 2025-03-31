import express from "express";
import { createUser, getUserByEmail } from "../../db/users";
import { authentication, random } from "../../helpers";
import { SuccessResponse, ErrorResponse } from "../../helpers/responseHandler";

const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      ErrorResponse(
        res,
        "Please provide all the required fields",
        "Failed to create user",
        400
      );
      return;
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      ErrorResponse(
        res,
        "User with this email already exists",
        "Failed to create user",
        400
      );
      return;
    }

    const salt = random();
    const user = await createUser({
      email,
      username: username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    SuccessResponse(res, "User created succeessfully!", user);
    return;
  } catch (error) {
    console.log(error);
    ErrorResponse(res, "Failed to register user", error.message, 500);
  }
};

export default register;
