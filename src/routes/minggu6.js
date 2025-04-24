const express = require("express");
const { getAnime, getFavorite } = require("../controllers/minggu6");
const router = express.Router();

router.get("/", getAnime);
router.get("/favorite/:mhs_nrp", getFavorite);

module.exports = router;
