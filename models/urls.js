"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Url extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Url.belongsTo(models.User, {
        foreignKey: "createdBy",
      });
      models.Url.hasMany(models.UrlEvent, {
        foreignKey: "urlId",
        sourceId: "id",
      });
    }
  }
  Url.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      link: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      customAlias: {
        allowNull: false,
        type: DataTypes.STRING(255),
        field: "custom_alias",
        unique: true,
      },
      topic: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      clickCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "click_count",
      },
      createdBy: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "created_by",
      },
    },
    {
      sequelize,
      modelName: "Url",
      tableName: "shortener_urls",
      timestamps: true,
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Url;
};
