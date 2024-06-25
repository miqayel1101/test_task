import { Router } from "express";
import userController from "../controllers/userController";
import validateRequest from "../middleware/validateRequest";
import { updateUserBalanceSchema } from "../validations/userValidation";

const router = Router();

router.put(
  "/update-balance",
  validateRequest(updateUserBalanceSchema),
  userController.updateUserBalance
);

export default router;
