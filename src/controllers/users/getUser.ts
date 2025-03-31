import express from "express";
import { get } from "lodash";
import { SuccessResponse } from "../../helpers/responseHandler";

const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const user = get(req, "identity");

    SuccessResponse(res, "User fetched successfully", user);
    return;
  } catch (error) {}
};

export default getUser;
