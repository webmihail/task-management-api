import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ITokenData } from "./interfaces/token-data.interface";
import { HttpError } from "@errors/errors";
import { IRegister } from "./interfaces/register.interface";
import { ILogin } from "./interfaces/login.interface";
import { User } from "@database/models/user";

export class AuthService {
  async login(data: ILogin) {
    const { email, password } = data || {};

    const user = await User.findOne({ where: { email } });
    if (!user) throw HttpError.badRequest("User not found");

    const isCorrectPassword = await this.checkPassword(
      password,
      user!.password,
    );
    if (!isCorrectPassword) throw HttpError.badRequest("Invalid password");

    return {
      user,
      token: this.generateToken({ id: user!.id, email: user!.email }),
    };
  }

  async register(data: IRegister) {
    const { email, password, repeatedPassword } = data || {};

    if (password !== repeatedPassword)
      throw HttpError.badRequest("Passwords don't match");

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        email,
        password,
      },
    });

    if (!created) throw HttpError.badRequest("User already exists");

    return {
      user: { id: user.id, email: user.email },
      token: this.generateToken({ id: user.id, email: user.email }),
    };
  }

  private checkPassword(
    password: string,
    checkingPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, checkingPassword);
  }

  private generateToken(tokenData: ITokenData) {
    return jwt.sign(tokenData, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPERATION,
    });
  }
}
