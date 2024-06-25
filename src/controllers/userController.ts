import { Request } from "express";
import BaseController from "./baseController";
import UserService from "../services/userService";

class UserController extends BaseController {
  private readonly userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
  }
  updateUserBalance = this.wrap(async (req: Request) => {
    const { userId, amount } = req.body;
    const user = await this.userService.updateUserBalance(userId, amount);
    return user;
  });
}

export default new UserController();
