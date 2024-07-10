import { UpdatePasswdDto } from 'src/auth-management/auth/dto/update-passwd.dto';

export abstract class UserAbstractRepository {
  abstract updatePasswd(data: UpdatePasswdDto);
  
  abstract findById(userId: string);
  // abstract  findByContactDetails(data: any)

  abstract resetPasswd(email: string, newPassword: string);

  abstract findOne();

  abstract changeStatus();

  abstract update();

  abstract findByEmail(email: string);

  abstract findByEmailAndPasswd(email: string, password: string);
}
