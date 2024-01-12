import { error } from "console";
import sequelize from "../config/sequelize-config";

export const sequelizeSync = async (): Promise<void> => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("connection has been established successfully");
    })
    .catch((err: Error) => {
      console.error("unable to connect the database");
    });

  await sequelize
    .sync({ force: false }) // Set force to true to drop and recreate tables on every application start
    .then(() => {
      console.log("Database synced");
    })
    .catch((error) => {
      console.error("Error syncing database:", error);
    });
};
