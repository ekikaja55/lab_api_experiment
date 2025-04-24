const { Op, Sequelize } = require("sequelize");
const { Anime, KategoriAnime } = require("../models");

const getAnime = async (req, res) => {
  const { keyword, tahunawal, tahunakhir } = req.query;
  // const result = await Anime.findAll({
  //   include: [{ model: KategoriAnime, attributes: [] }],
  //   attributes: [
  //     "anime_id",
  //     "anime_judul",
  //     "anime_tahun_rilis",
  //     [Sequelize.literal("`KategoriAnime`.kategori_nama"), "kategori_nama"],
  //     [
  //       Sequelize.literal("`KategoriAnime`.kategori_deskripsi"),
  //       "kategori_deskripsi",
  //     ],
  //   ],
  //   where: {
  //     [Op.or]: [
  //       {
  //         anime_judul: { [Op.like]: `%${keyword}%` },
  //       },
  //       {
  //         anime_tahun_rilis: {
  //           [Op.gte]: tahunawal,
  //           [Op.lte]: tahunakhir,
  //         },
  //       },
  //     ],
  //   },
  // });

  const myquery = await Anime.findAll({
    include: [{ model: KategoriAnime }],
    where: {
      [Op.or]: [
        {
          anime_judul: { [Op.like]: `%${keyword}%` },
        },
        {
          anime_tahun_rilis: {
            [Op.gte]: tahunawal,
            [Op.lte]: tahunakhir,
          },
        },
      ],
    },
  });
  const result = myquery.map((item) => {
    return {
      anime_id: item.anime_id,
      anime_judul: item.anime_judul,
      anime_tahun_rilis: item.anime_tahun_rilis,
      kategori_nama: item.KategoriAnime.kategori_nama,
      kategori_deskripsi: item.KategoriAnime.kategori_deskripsi,
    };
  });

  if (result.length === 0) {
    return res.status(404).json({ pesan: "Tidak ditemukan" });
  }
  return res.status(200).json(result);
};
const getFavorite = async (req, res) => {};

module.exports = {
  getAnime,
  getFavorite,
};
