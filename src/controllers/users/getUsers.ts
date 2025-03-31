import express from "express";
import { getUsers } from "../../db/users";
import { SuccessResponse } from "../../helpers/responseHandler";

// add some validate admin middleware later
const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    SuccessResponse(res, "Users fetched successfully", users);
    return;
  } catch (error) {}
};

export default getAllUsers;
