"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    static associate(models) {
      Anime.belongsTo(models.KategoriAnime, {
        foreignKey: "kategori_id",
      });
      Anime.belongsToMany(models.Mahasiswa, {
        foreignKey: "anime_id",
        otherKey: "mhs_id",
        through: models.Favorite,
      });
    }
  }
  Anime.init(
    {
      anime_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      anime_judul: {
        type: DataTypes.STRING,
      },
      anime_tahun_rilis: {
        type: DataTypes.INTEGER,
      },
      anime_rating: {
        type: DataTypes.FLOAT,
      },
      anime_sinopsis: {
        type: DataTypes.TEXT,
      },
      kategori_id: {
        type: DataTypes.BIGINT,
      },
    },
    {
      sequelize,
      modelName: "anime",
      tableName: "anime",
      timestamps: true,
      paranoid: true,
      name: {
        singular: "Anime",
        plural: "Anime",
      },
    }
  );
  return Anime;
};
