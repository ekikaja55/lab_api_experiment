"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    static associate(models) {
      Mahasiswa.belongsToMany(models.Anime, {
        foreignKey: "mhs_id",
        otherKey: "anime_id",
        through: models.Favorite,
      });
    }
  }
  Mahasiswa.init(
    {
      mhs_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      mhs_nrp: {
        type: DataTypes.STRING,
      },
      mhs_nama: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "mahasiswa",
      tableName: "mahasiswa",
      timestamps: true,
      paranoid: true,
      name: {
        singular: "Mahasiswa",
        plural: "Mahasiswa",
      },
    }
  );
  return Mahasiswa;
};
