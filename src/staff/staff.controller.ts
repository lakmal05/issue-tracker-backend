import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateStaffDto } from './dto/create-staff.dto';

@ApiTags('Staff')
@Controller({
  path: 'staff',
})
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  /**
   * Find all Admin
   * @returns array of staff
   */
  @Get('find-all')
  async findAll() {
    return this.staffService.findAll();
  }

  @Get('find-one/:staffId')
  async findOne(@Param('staffId') staffId: string) {
    return this.staffService.findOne(staffId);
  }



  @Put('update/:staffId')
  async update(@Param('staffId') staffId: string, @Body() data: any) {
    return this.staffService.update(staffId, data);
  }
}
