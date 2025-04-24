const db = {};
const { DataTypes } = require("sequelize");
const connm3 = require("../database/connm3");
const Anime = require("./Anime");
const KategoriAnime = require("./KategoriAnime");
const Mahasiswa = require("./Mahasiswa");
const Favorite = require("./Favorite");

db.Anime = Anime(connm3, DataTypes);
db.KategoriAnime = KategoriAnime(connm3, DataTypes);
db.Mahasiswa = Mahasiswa(connm3, DataTypes);
db.Favorite = Favorite(connm3, DataTypes);

for (const key of Object.keys(db)) {
  db[key].associate(db);
}

module.exports = db;
