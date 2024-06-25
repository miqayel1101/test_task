import User from "../../models/user";

const userExists = async (userId: number) => {
  const user = await User.findByPk(userId);
  return !!user;
};

export default userExists;
