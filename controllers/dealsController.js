const db = require("../utils/db");

exports.getDeals = async (req, res) => {
  try {
    const query = "SELECT * FROM deals";
    const results = await db.query(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
