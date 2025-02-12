"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Url, {
        foreignKey: "createdBy",
        sourceId: "id",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      isEmailVerified: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        field: "is_email_verified",
      },
      active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "shortener_users",
      timestamps: true,
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};
