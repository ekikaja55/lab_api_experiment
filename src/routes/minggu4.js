const express = require("express");
const {
  getAnime,
  getOneAnime,
  insertAnime,
  updateAnime,
  deleteAnime,
} = require("../controllers/minggu4");
const router = express.Router();

// localhost:3000/api/v1/minggu4?id_kategori=1

// localhost:3000/api/v1/minggu4
router.get("/", getAnime);
// localhost:3000/api/v1/minggu4/7
router.get("/:anime_id", getOneAnime);
router.post("/", insertAnime);
router.put("/:anime_id", updateAnime);
router.delete("/:anime_id", deleteAnime);

module.exports = router;
