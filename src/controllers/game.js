let gameList = [
  { nama: "Sekiro", harga: 100 },
  { nama: "Dark Souls", harga: 50 },
  { nama: "BloodBorne", harga: 80 },
];

const getAllGame = (req, res) => {
  return res.status(200).json(gameList);
};
const getOneGame = (req, res) => {
  const { keyword } = req.params;

  const gameyangdicari = gameList.find((item) => {
    return item.nama.includes(keyword);
  });

  if (gameyangdicari) {
    return res.status(200).json(gameyangdicari);
  } else {
    return res.status(404).send("Game tidak ditemukan");
    //   return res.sendStatus(404);
  }
};

// untuk POST, PUT, PATCH, kita pakainya req.body
const createGame = (req, res) => {
  const isi = req.body;
  gameList.push(isi);
  return res.status(200).json({ pesan: "Sukses" });
};
const updateGame = (req, res) => {};
const deleteGame = (req, res) => {
  const { keyword } = req.params;
  gameList = gameList.filter((item) => {
    return !item.nama.includes(keyword);
  });
  return res.status(200).json({ pesan: "Sukses" });
};

module.exports = {
  getAllGame,
  getOneGame,
  createGame,
  updateGame,
  deleteGame,
};

/**
 * CRUD
 *
 * READ -> get
 * CREATE -> post
 * UPDATE -> put/patch
 * DELETE -> delete
 *
 * kalau url pakai ?, maka pakai req.query
 * kalau url pakai /:param, maka pakai req.params
 * kalau pakai post/put, maka pakai req.body
 */
