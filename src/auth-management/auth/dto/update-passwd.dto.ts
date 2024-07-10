import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswdDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
