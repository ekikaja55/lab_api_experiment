const express = require("express");
const {
  getAnime,
  getOneAnime,
  insertAnime,
  updateAnime,
  deleteAnime,
} = require("../controllers/minggu3");
const router = express.Router();

router.get("/", getAnime);
router.get("/:anime_id", getOneAnime);
router.post("/", insertAnime);
router.put("/:anime_id", updateAnime);
router.delete("/:anime_id", deleteAnime);

module.exports = router;
