import express, { Request, Response, NextFunction } from "express";
import { sequelize } from "./models";
import userRoutes from "./routes/userRoutes";
import umzug from "./umzug";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

app.use((error: any, _: Request, res: Response, ___: NextFunction) => {
  if (error.formatWith && typeof error.formatWith === "function") {
    return res.status(422).json({
      status: 422,
      message: error.message,
      data: null,
      errors: error.errors,
    });
  }
  if (error) {
    return res.status(error.status || 400).json({
      status: error.status,
      message: error.message,
      data: null,
      errors: error.errors,
    });
  }

  return res.status(500).json({
    status: 500,
    message: error.message,
    data: null,
    errors: null,
  });
});
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(async () => {
  await umzug.up();
  console.log("Seeding completed");

  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
