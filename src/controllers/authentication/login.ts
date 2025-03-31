import express from "express";
import { createUser, getUserByEmail } from "../../db/users";
import { authentication, random } from "../../helpers";
import { SuccessResponse, ErrorResponse } from "../../helpers/responseHandler";
const SECRET = process.env.SECRET;

const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      ErrorResponse(
        res,
        "Please provide all the required fields",
        "Failed to login",
        400
      );
      return;
    }
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      ErrorResponse(
        res,
        "No user found with this email",
        "Failed to login",
        400
      );
      return;
    }

    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      ErrorResponse(res, "Incorrect Password", "Failed to login", 400);
      return;
    }
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();
    res.cookie("sessionToken", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    SuccessResponse(res, "Logged in successfully", user).end();
    return;
  } catch (error) {}
};

export default login;
