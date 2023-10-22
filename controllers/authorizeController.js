const bcrypt = require("bcryptjs");
const signToken = require("../utils/signToken");
const verifyToken = require("../utils/decodeToken");

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

    const token = signToken(user.ID);
    const updateTokenQuery = "UPDATE users SET token = ? WHERE id = ?";
    await db.query(updateTokenQuery, [token, user.ID]);

    return res.status(200).json({
      token,
      user: {
        id: user.ID,
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

exports.getCurrentUser = async (req, res) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const results = await db.query("SELECT * FROM users WHERE ID = ?", [
      decoded.id,
    ]);

    if (results.length === 0) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = results[0];
    return res.json({username: user.username});

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
