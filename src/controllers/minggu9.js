const bcryptjs = require("bcryptjs");
const { Users } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateApiKey(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let apiKey = "";
  for (let i = 0; i < length; i++) {
    apiKey += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return apiKey;
}

const register = async (req, res) => {
  const { user_nama, user_email, user_password } = req.body;

  const hashPass = await bcryptjs.hash(user_password, 10);

  const apiKey = generateApiKey();

  const result = await Users.create({
    user_nama: user_nama,
    user_email: user_email,
    user_password: hashPass,
    user_api_key: apiKey,
  });

  return res.status(200).json({
    message: "Data Berhasil Masuk",
    Data: result,
  });
};

const login = async (req, res) => {
  const { user_nama, user_password } = req.body;
  const user = await Users.findOne({
    where: {
      user_nama: user_nama,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Gagal Login" });
  }

  const cekPass = await bcryptjs.compare(user_password, user.user_password);

  if (cekPass) {
    user.user_password = undefined;

    const accessToken = jwt.sign({ user }, process.env.SECRET_AT, {
      expiresIn: "30s",
    });

    const refreshToken = jwt.sign({ user }, process.env.SECRET_RT, {
      expiresIn: "1m",
    });

    res.cookie("userCookie", refreshToken, {
      httpOnly: true,
      maxAge: 120 * 1000,
    });

    return res
      .status(200)
      .json({ message: "Sukses Login", accessToken: accessToken });
  } else {
    return res.status(401).json({ message: "Gagal Login" });
  }
};

const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.userCookie) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.userCookie;
  jwt.verify(refreshToken, process.env.SECRET_RT, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      const accessToken = jwt.sign(
        { user: decoded.user },
        process.env.SECRET_AT,
        {
          expiresIn: "30s",
        }
      );
      return res.status(200).json(accessToken);
    }
  });
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.userCookie) {
    return res.status(204);
  }
  res.clearCookie("userCookie", { httpOnly: true });
  return res.status(200).json({ pesan: "Sukses Logout" });
};

const admin = async (req, res) => {
  const cookies = req.cookies.userCookie;
  return res.status(200).json(cookies);
};
const user = async (req, res) => {
  return res.sendStatus(200);
};
const lelucon = async (req, res) => {
  return res.sendStatus(200);
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  lelucon,
  admin,
  user,
};
