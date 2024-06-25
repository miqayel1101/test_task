import { sequelize } from "./index";
import { Model, DataTypes } from "sequelize";

class User extends Model {
  public id!: number;
  public balance!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 10000,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default User;
