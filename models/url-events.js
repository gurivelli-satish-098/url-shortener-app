"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UrlEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.UrlEvent.belongsTo(models.Url, {
        foreignKey: "urlId",
      });
    }
  }
  UrlEvent.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      urlId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "url_id",
      },
      ip: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      browser: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      os: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      device: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UrlEvent",
      tableName: "shortener_url_clicks",
      timestamps: true,
      freezeTableName: true,
      createdAt: "created_at",
    }
  );
  return UrlEvent;
};
