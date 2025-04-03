import express from "express";

import controllers from "../controllers/index";
import createUserValidator from "../validators/authentication/createUserValidator";
import loginUserValidator from "validators/authentication/loginUserValidator";
const { register, login } = controllers;
export default (router: express.Router) => {
  router.post("/auth/register", createUserValidator, register);
  router.post("/auth/login", loginUserValidator, login);
};
