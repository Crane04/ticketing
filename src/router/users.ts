import express from "express";
import controllers from "../controllers/index";
import { validateUser } from "../middlewares/validateUser";
import AuthController from "controllers/users";

export default (router: express.Router) => {
  router.get("/users/retrieve", validateUser, AuthController.getUser);
  router.post("/users/register", AuthController.register);
  router.post("/users/login", AuthController.login);
};
