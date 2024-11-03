import { IsString, MinLength } from "class-validator";
import { Expose } from "class-transformer";

export class LoginDTO {
  @IsString()
  @Expose()
  email: string;

  @IsString()
  @MinLength(6)
  @Expose()
  password: string;
}
