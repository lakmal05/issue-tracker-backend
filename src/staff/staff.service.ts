import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StaffAbstractRepository } from './infrastructure/repositories/staff.abstract.repository';

import { CreateStaffDto } from './dto/create-staff.dto';
import { UserService } from 'src/user/user.service';
import { StatusEnum } from 'src/common/enum/status.enum';

@Injectable()
export class StaffService {
  constructor(
    private readonly staffRepository: StaffAbstractRepository,
    private readonly userService: UserService,
  ) {}

  findOne(staffId: string) {
    return this.staffRepository.findOne(staffId);
  }

  findAll() {
    return this.staffRepository.findAll();
  }



  async update(staffId: string, data: any) {
    // const isExists = await this.findOne(staffId);
    return this.staffRepository.update(staffId, data);
  }
}
