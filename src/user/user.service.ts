import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserAbstractRepository } from './infrastructure/repositories/user.abstract.repository';
import { ResetPasswdDto } from 'src/auth-management/auth/dto/reset-passwd.dto';
import { UserTypeEnum } from 'src/common/enum/userType.enum';
import { UpdatePasswdDto } from 'src/auth-management/auth/dto/update-passwd.dto';

@Injectable()
export class UserService {

  constructor(
    private readonly userService: UserAbstractRepository,
  ) {}

  findById(userId: string) {
    return this.userService.findById(userId);
  }

  // async findByContactDetails(data) {
  //  return await this.userService.findByContactDetails(data)
  // }

  async findByEmail(email: string) {
    return await this.userService.findByEmail(email);
  }

  async findByEmailAndPasswd(email: string, password: string) {
    return await this.userService.findByEmailAndPasswd(email, password);
  }


  async updatePasswd(userType: UserTypeEnum, data: UpdatePasswdDto) {
  return await this.userService.updatePasswd(data)
  }
}
