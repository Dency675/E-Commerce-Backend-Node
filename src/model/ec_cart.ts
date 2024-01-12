import Sequelize, { DataTypes } from "sequelize";
import EcCart from "../../types/modelTypes/ec_carts";
import sequelize from "../config/sequelize-config";

EcCart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    registration_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    modelName: "ec_cart",
    tableName: "ec_cart",
  }
);

export default EcCart;
