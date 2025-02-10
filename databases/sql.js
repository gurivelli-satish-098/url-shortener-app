"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const baseModelPath = `${__dirname}/../models`;
const Models = fs
  .readdirSync(baseModelPath)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
  })
  .map((file) => require(path.join(baseModelPath, file)));

module.exports = class Sql {
  static loadSequelize = async () => {
    try {
      this._sequelize = new Sequelize(
        process.env.DATABASE,
        process.env.USERNAME,
        process.env.PASSWORD,
        {
          host: process.env.HOST,
          dialect: process.env.DIALECT,
          port: process.env.PORT,
          pool: {
            max: 10, // Maximum connections
            min: 1, // Minimum connections
            acquire: 30000, // Max time (ms) client can try to connect
            idle: 10000, // Max time (ms) connection can be idle
          },
          dialectOptions: {
            connectTimeout: 60000, // default is 10s which causes occasional ETIMEDOUT errors (see https://stackoverflow.com/a/52465919/491553)
          },
          logging: false,
          retry: {
            match: [
              /Deadlock/i,
              Sequelize.ConnectionError,
              Sequelize.ConnectionRefusedError,
              Sequelize.ConnectionTimedOutError,
              Sequelize.TimeoutError,
            ],
            max: 2,
            backoffBase: 2000,
            backoffExponent: 2,
          },
        }
      );
      await this._sequelize.authenticate();
      console.log("Connected to Database.");
      return this._sequelize;
    } catch (error) {
      console.error("Unable to connect to database: ", error);
      throw error;
    }
  };

  static connect = async () => {
    // re-use the sequelize instance across invocations to improve performance
    if (!this._sequelize) {
      this._sequelize = await Sql.loadSequelize();
      const sql = {};
      Models.forEach((modelDef) => {
        const model = modelDef(this._sequelize, Sequelize.DataTypes);
        sql[model.name] = model;
      });
      Object.keys(sql).forEach((modelName) => {
        if (sql[modelName].associate) {
          sql[modelName].associate(sql);
        }
      });
      sql.sequelize = this._sequelize;
      sql.Sequelize = Sequelize;
      this._sql = sql;
    } else {
      // restart connection pool to ensure connections are not re-used across invocations
      this._sequelize.connectionManager.initPools();

      // restore `getConnection()` if it has been overwritten by `close()`
      if (
        Object.prototype.hasOwnProperty.call(this._sequelize.connectionManager, "getConnection")
      ) {
        delete this._sequelize.connectionManager.getConnection;
      }
    }
    return this._sql;
  };

  static get sql() {
    return this._sql;
  }
};
