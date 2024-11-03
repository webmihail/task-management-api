import { IsString, MinLength } from "class-validator";
import { Expose } from "class-transformer";

import { LoginDTO } from "./login.dto";

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(6)
  @Expose()
  repeatedPassword: string;
}
