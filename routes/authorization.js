const express = require("express");
const validateBody = require("../middlewares/validateBody");
const {
  checkIfUserExist,
  validateUserFields,
} = require("../middlewares/authorizeMiddlewares");