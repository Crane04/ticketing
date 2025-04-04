import express from "express";
import getUsers from "../../services/users/getUsers.services";
import { SuccessResponse } from "../../helpers/ApiResponse";

// add some validate admin middleware later
const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    SuccessResponse(res, "Users fetched successfully", users);
    return;
  } catch (error) {}
};

export default getAllUsers;
