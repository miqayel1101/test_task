import User from "../models/user";
import { Transaction } from "sequelize";
import { ValidationError } from "../utils/errors";

class UserService {
  updateUserBalance = async (userId: number, amount: number) => {
    let transaction: Transaction | null = null;

    transaction = await User.sequelize!.transaction();

    const user = await User.findByPk(userId, { transaction });

    if (!user) {
      throw new ValidationError("User not found");
    }

    if (user.balance + amount < 0) {
      throw new ValidationError("Insufficient funds");
    }

    user.balance += amount;
    await user.save({ transaction });

    await transaction.commit();

    return user;
  };
}

export default UserService;
