import { Schema } from "joi";
import { ValidationError } from "../utils/errors";
import { Request, Response, NextFunction } from "express";

const validateRequest = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      if (error.isJoi) {
        const message = error.details
          .map((detail: any) => detail.message)
          .join(", ");
        next(new ValidationError(message));
      } else {
        next(new ValidationError(error.message));
      }
    }
  };
};

export default validateRequest;
