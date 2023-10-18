const bcrypt = require("bcryptjs");
const signToken = require("../utils/signToken");

const db = require("../utils/db");

exports.registrationController = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?)";

    const results = await db.query(query, [email, hashedPassword, username]);

    return res.status(201).json({
      user: {
        email,
        username,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.authorizationController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = "SELECT * FROM users WHERE email = ?";
    const [results] = await db.query(query, [email]); //return object

    if (Object.keys(results).length === 0) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const user = results;

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = signToken(user.id);
    const updateTokenQuery = "UPDATE users SET token = ? WHERE id = ?";
    await db.query(updateTokenQuery, [token, user.id]);

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.logoutUser = async (req, res) => {
  const { id } = req.user;

  try {
    const updateTokenQuery = "UPDATE users SET token = ? WHERE id = ?";
    await db.query(updateTokenQuery, ["", id]);
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
