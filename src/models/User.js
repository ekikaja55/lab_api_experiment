"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "nonadmin",
      },
      user_api_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_saldo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      paranoid: false,
      timestamps: false,
      name: {
        plural: "User",
        singular: "User",
      },
    }
  );
  return User;
};
