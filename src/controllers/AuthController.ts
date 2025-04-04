import { Request, Response, NextFunction } from "express";
import ApiResponse from "../helpers/ApiResponse";
import CreateUser from "services/users/createUser";
import LoginUser from "../services/users/loginUser";
import { isBoolean } from "lodash";
import { get } from "lodash";

class AuthController {
  static register = async (req: Request, res: Response): Promise<any> => {
    const { email, password, username } = req.body;

    const user = await CreateUser.run(email, username, password);
    if (!user) {
      ApiResponse.error(res, "Couldn't create account, try again", 400);
      return;
    }
    ApiResponse.success(res, "User created successfully!", user);
  };

  static login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const user = await LoginUser.run(email, password);

    if (isBoolean(user)) {
      // will only return boolean if user doesnt exist.
      ApiResponse.error(res, "Invalid Credentials", 400);
      return;
    }
    ApiResponse.success(res, "User logged in successfully", user);
  };
  static getUser = async (req: Request, res: Response): Promise<any> => {
    const user = get(req, "identity"); //passed from middleware

    ApiResponse.success(res, "User retrieved successfully", user);
  };
}

export default AuthController;
