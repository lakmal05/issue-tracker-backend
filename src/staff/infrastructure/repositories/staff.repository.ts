import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StaffAbstractRepository } from './staff.abstract.repository';
import { Repository } from 'typeorm';
import { StaffEntity } from '../entites/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffMapper } from '../mappers/staff.mapper';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';

@Injectable()
export class StaffRepository implements StaffAbstractRepository {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    const allSatff = await this.staffRepository.find({
      relations: { user: { role: true } },
    });
    return await StaffMapper.toDomain(allSatff);
  }

  async findOne(staffId: string) {
    const staff = await this.staffRepository.findOne({
      where: { id: staffId },
      select: ['id'],
      relations: ['user'],
    });
    return await StaffMapper.toDomain(staff);
  }

  async update(staffId: string, data: any) {
    console.log(data);

    try {
      // Find the staff member by ID with its related user
      const staff = await this.staffRepository.findOne({
        where: { id: staffId },
        relations: ['user'],
      });

      if (!staff) {
        throw new HttpException('Unable tot find staff', HttpStatus.NOT_FOUND);
      }

      // Update staff properties
      staff.contactNo = data.contactNo;

      // Update the related user properties if provided
      if (data.user && staff.user) {
        staff.user.firstName = data.user.firstName;
        staff.user.lastName = data.user.lastName;
        staff.user.role = data.user.role.id;
        await this.userRepository.save(staff.user);
      }

      // Save the updated staff entity
      const updatedStaff = await this.staffRepository.save(staff);
      return updatedStaff;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
