import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class ResetPasswdDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  newPassword: string;

  // @IsOptional()
  @IsNotEmpty()
  otp: string;
}
