"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KategoriAnime extends Model {
    static associate(models) {
      KategoriAnime.hasMany(models.Anime, {
        foreignKey: "kategori_id",
      });
    }
  }
  KategoriAnime.init(
    {
      kategori_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      kategori_nama: {
        type: DataTypes.STRING,
      },
      kategori_deskripsi: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "kategori_anime",
      tableName: "kategori_anime",
      timestamps: true,
      paranoid: true,
      name: {
        singular: "KategoriAnime",
        plural: "KategoriAnime",
      },
    }
  );
  return KategoriAnime;
};
