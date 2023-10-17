const { authorizeSchema } = require("../models/userModel");

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

const connection = require("../server"); // Import your MySQL connection

exports.checkIfUserExist = (req, res, next) => {
  const email = req.body.email;
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (results.length > 0) {
        return res.status(409).json({ message: "Email in use" });
      } else {
        next();
      }
    }
  );
};
