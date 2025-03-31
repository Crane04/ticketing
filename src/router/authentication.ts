import express from "express";

import controllers from "../controllers/index";
const { register, login } = controllers;
export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
