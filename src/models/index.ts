require('dotenv').config();
import { join } from "path";
import { readdirSync } from "fs";
import { Sequelize } from "sequelize";
const env = process.env.NODE_ENV || "development";

const config = require("../config/config.js")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db: any = {};

readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== "index.ts" && file.slice(-3) === ".ts"
  )
  .forEach((file) => {
    const model = require(join(__dirname, file)).default;
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize };
export default db;
