import express from "express";
import { get } from "lodash";
import ApiResponse from "../../helpers/ApiResponse";

const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const user = get(req, "identity");

    ApiResponse.success(res, "User fetched successfully", user);
    return;
  } catch (error) {}
};

export default getUser;
