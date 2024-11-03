import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../dbConnection";

export class User extends Model {
  public id: string;
  public email: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(
          user.password,
          Number(process.env.HASH_CYCLES),
        );
      },
      beforeUpdate: async (user) => {
        user.updatedAt = new Date();
      },
    },
  },
);
