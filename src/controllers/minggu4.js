const { Op } = require("sequelize");
const { Anime } = require("../models");

const getAnime = async (req, res) => {
  // req.query untuk yang menangkap inputan di belakang simbol ?
  // localhost:3000/api/v1/minggu4?id_kategori=1
  const { id_kategori } = req.query;

  let result;
  if (id_kategori) {
    // kalau ada id_kategori dan kita mau mencari berdasarkan itu maka
    // where id_kategori = 1 AND tahun_rilis > 1900 AND tahun_rilis < 2005
    result = await Anime.findAll({
      where: {
        [Op.or]: [
          { id_kategori: 1 },
          { tahun_rilis: { [Op.gte]: 1900, [Op.lte]: 2005 } },
        ],
      },
    });
  } else {
    result = await Anime.findAll();
  }

  if (result.length > 0) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ pesan: "Tidak ditemukan" });
  }
};
const getOneAnime = async (req, res) => {
  const { anime_id } = req.params;

  const result = await Anime.findByPk(anime_id);
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ pesan: "Tidak ditemukan" });
  }
};
const insertAnime = async (req, res) => {
  const { judul, tahun_rilis, rating, sinopsis, id_kategori } = req.body;

  const result = await Anime.create({
    judul,
    tahun_rilis,
    rating,
    sinopsis,
    id_kategori,
  });
  return res.status(200).json(result);
};
const updateAnime = async (req, res) => {
  const { anime_id } = req.params;
  const { judul, tahun_rilis, rating, sinopsis, id_kategori } = req.body;
  const yangMauDiupdate = await Anime.findByPk(anime_id);
  if (!yangMauDiupdate) {
    return res.status(404).json({ pesan: "Data tidak ditemukan" });
  }

  //lakukan update
  const result = await yangMauDiupdate.update({
    judul,
    tahun_rilis,
    rating,
    sinopsis,
    id_kategori,
  });

  return res.status(200).json(result);
};
const deleteAnime = async (req, res) => {
  const { anime_id } = req.params;
  const yangMauDihapus = await Anime.findByPk(anime_id);
  if (!yangMauDihapus) {
    return res.status(404).json({ pesan: "Data tidak ditemukan" });
  }
  const result = await yangMauDihapus.destroy();
  // const result = await yangMauDihapus.restore();
  return res.status(200).json(result);
};

module.exports = {
  getAnime,
  getOneAnime,
  insertAnime,
  updateAnime,
  deleteAnime,
};
