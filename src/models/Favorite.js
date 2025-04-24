"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {}
  }
  Favorite.init(
    {
      favorite_tahun: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "favorite",
      tableName: "favorite",
      timestamps: true,
      paranoid: true,
      name: {
        singular: "Favorite",
        plural: "Favorite",
      },
    }
  );
  return Favorite;
};
