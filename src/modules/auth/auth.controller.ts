import { Request, Response, NextFunction } from "express";

import { AuthService } from "./auth.service";

export class AuthController {
  private readonly authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginData = await this.authService.login(req.body);
      res.status(200).send(loginData);
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const registerData = await this.authService.register(req.body);
      res.status(200).send(registerData);
    } catch (error) {
      next(error);
    }
  }
}
