const { authorizeSchema, loginSchema } = require("../model/userModel");

exports.validateUserFields = async (req, res, next) => {
  const request = req.body;
  const { error, value } = authorizeSchema.validate(request);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    req.body = value;
    next();
  }
};

exports.validateUserLoginFields = async (req, res, next) => {
  const request = req.body;
  
  const { error, value } = loginSchema.validate(request);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    req.body = value;
    next();
  }
};

const db = require("../utils/db");

exports.checkIfUserExist = async (req, res, next) => {
  const email = req.body.email;
  try {
    const results = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (results.length > 0) {
      return res.status(409).json({ message: "Email in use" });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

