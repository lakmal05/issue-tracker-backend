import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class ContactNoLoginDto {
  @IsOptional()
  @Length(2, 15, {
    message: 'Contact number must be between 5 and 15 characters',
  })
  @IsString()
  contactNo: string;

  @IsString()
  dialCode: string;

  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @IsString()
  @IsNotEmpty()
  fcmToken: string;

  @IsOptional()
  otp: string;
}
