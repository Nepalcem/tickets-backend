const express = require("express");
const validateBody = require("../middlewares/validateBody");
const {
  checkIfUserExist,
  validateUserFields,
  validateUserLoginFields,
} = require("../middlewares/authorizeMiddlewares");

const {
  registrationController,
  authorizationController,
  logoutUser,
  getCurrentUser
} = require("../controllers/authorizeController");
const { validateToken } = require("../middlewares/validateToken");

const router = express.Router();

router.post(
  "/register",
  validateBody,
  validateUserFields,
  checkIfUserExist,
  registrationController
);
router.post(
  "/login",
  validateBody,
  validateUserLoginFields,
  authorizationController
);
router.post("/logout", validateToken, logoutUser);
router.get("/current", getCurrentUser);


module.exports = router;
