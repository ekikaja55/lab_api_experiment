const express = require("express");
const {
  getAllGame,
  createGame,
  updateGame,
  deleteGame,
  getOneGame,
} = require("../controllers/game");
const router = express.Router();

// /api/v1/game nanti digroupingkan di index.js
router.get("/", getAllGame);
// localhost:3000/api/v1/game/1
// localhost:3000/api/v1/game/2
// localhost:3000/api/v1/game/3
router.get("/:keyword", getOneGame);
router.post("/", createGame);
router.put("/:indexnya", updateGame);
router.delete("/:keyword", deleteGame);

module.exports = router;
