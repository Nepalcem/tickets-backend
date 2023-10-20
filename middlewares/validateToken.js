const db = require("../utils/db");
const verifyToken = require("../utils/decodeToken");

exports.validateToken = async (req, res, next) => {
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

    req.user = results[0];

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
