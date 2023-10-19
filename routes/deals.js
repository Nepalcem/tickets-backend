const express = require("express");
const { validateToken } = require("../middlewares/validateToken");
const { getDeals } = require("../controllers/dealsController");

const router = express.Router();

router.get("/", validateToken, getDeals);

module.exports = router;
