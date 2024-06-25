import path from "path";

require('dotenv').config({
  path: path.join(
    process.cwd(),
    process.env.NODE_ENV !== 'development' ? '.production.env' : '.env',
  ),
});
module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
  },
};
