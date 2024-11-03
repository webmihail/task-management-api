import { ILogin } from "./login.interface";

export interface IRegister extends ILogin {
  repeatedPassword: string;
}
