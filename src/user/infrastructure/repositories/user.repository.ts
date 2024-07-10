import { Injectable } from '@nestjs/common';
import { UserAbstractRepository } from './user.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { In, Repository } from 'typeorm';
import { UserMapper } from '../mappers/user.mapper';
import { StatusEnum } from 'src/common/enum/status.enum';
import { UpdatePasswdDto } from 'src/auth-management/auth/dto/update-passwd.dto';

@Injectable()
export class UserRepository implements UserAbstractRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // findByContactDetails(data: any) {
  //  return await this.user
  // }
  async findById(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        status: In([StatusEnum.ACTIVE, StatusEnum.INACTIVE]),
        id: userId,
      },
      relations: {
        staff: true,
        role: true,
      },
    });
    return UserMapper.toDomain(user);
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        status: In([StatusEnum.ACTIVE, StatusEnum.INACTIVE]),
        email: email,
      },
      relations: {
        staff: true,
        role: true,
      },
    });
    return UserMapper.toDomain(user);
  }

  findOne() {
    throw new Error('Method not implemented.');
  }
  changeStatus() {
    throw new Error('Method not implemented.');
  }
  update() {
    throw new Error('Method not implemented.');
  }

  async findByEmailAndPasswd(email: string, password: string) {
    await this.userRepository.findOne({
      where: {},
    });
  }

  async resetPasswd(email: string, newPassword: string) {
    await this.userRepository.update(
      { email: email },
      { password: newPassword },
    );
    return this.findByEmail(email);
  }
  async updatePasswd(data: UpdatePasswdDto) {
    return await this.userRepository.update(
      { id: data.userId },
      { password: data.newPassword },
    );
    // return await this.findById(data.userId);
  }
}
