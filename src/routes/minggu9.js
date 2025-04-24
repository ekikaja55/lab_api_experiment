const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  refreshToken,
  admin,
  user,
  lelucon,
} = require("../controllers/minggu9");

router.post("/register", register);
router.post("/login", login);
router.get("/refreshtoken", refreshToken);
router.get("/logout", logout);
router.get("/admin", admin);
router.get("/user", user);
router.get("/lelucon", lelucon);

module.exports = router;
