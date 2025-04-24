const { QueryTypes } = require("sequelize");
const db = require("../database/connm3");

const getAnime = async (req, res) => {
  const result = await db.query(
    `SELECT * FROM anime
     JOIN kategori_anime ON kategori_anime.id_kategori = anime.id_kategori`,
    {
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json(result);
};
const getOneAnime = async (req, res) => {
  const { anime_id } = req.params;
  const result = await db.query(
    "SELECT * FROM anime JOIN kategori_anime ON kategori_anime.id_kategori = anime.id_kategori WHERE anime.id_anime=?",
    {
      type: QueryTypes.SELECT,
      replacements: [anime_id],
    }
  );
  if (result.length > 0) {
    return res.status(200).json(result[0]);
  } else {
    return res.status(404).json({ pesan: "Tidak ditemukan" });
  }
};
const insertAnime = async (req, res) => {
  const { judul, tahun_rilis, rating, sinopsis, id_kategori } = req.body;
  const result = await db.query(
    "INSERT INTO anime(judul,tahun_rilis,rating,sinopsis,id_kategori) VALUES(:judul,:tahun_rilis,:rating,:sinopsis,:id_kategori)",
    {
      type: QueryTypes.INSERT,
      replacements: {
        judul: judul,
        tahun_rilis: tahun_rilis,
        rating: rating,
        sinopsis: sinopsis,
        id_kategori: id_kategori,
      },
    }
  );
  return res
    .status(200)
    .json({ pesan: `Berhasil insert dengan id : ${result[0]}` });
};
const updateAnime = async (req, res) => {};
const deleteAnime = async (req, res) => {};

module.exports = {
  getAnime,
  getOneAnime,
  insertAnime,
  updateAnime,
  deleteAnime,
};
