import express from "express";
import controllers from "../controllers/index";
import { validateUser } from "../middlewares/validateUser";
const { getAllUsers, getUser } = controllers;

export default (router: express.Router) => {
  router.get("/users/all", validateUser, getAllUsers);
  router.get("/users/get-one", validateUser, getUser);
};
