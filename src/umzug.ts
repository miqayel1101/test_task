import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";

import { sequelize } from "./models"; // Adjust the import path as per your project structure

const umzug = new Umzug({
  migrations: {
    glob: ['seeders/*.js', { cwd: __dirname }],
    resolve: ({ name, path, context }) => {
        const migration = require(path || '')
        return {
            name,
            up: async () => migration.up(context, Sequelize),
            down: async () => migration.down(context, Sequelize),
        }
    },
},
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export default umzug;
