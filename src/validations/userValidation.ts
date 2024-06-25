import Joi from "joi";
import userExists from "./validationChecks/user";

const updateUserBalanceSchema = Joi.object({
  userId: Joi.number()
    .integer()
    .positive()
    .required()
    .external(async (value) => {
      const user = await userExists(value);
      if (!user) {
        throw new Error("User not found");
      }
      return value;
    }),
  amount: Joi.number().integer().required(),
});

export { updateUserBalanceSchema };
