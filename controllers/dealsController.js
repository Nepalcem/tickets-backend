const db = require("../utils/db");

exports.getDeals = async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM deals", []);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
