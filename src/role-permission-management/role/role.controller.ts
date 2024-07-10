import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';

@Controller({
  path: 'role',
})
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  create(@Body() data: RoleDto) {
    return this.roleService.create(data);
  }

  @Get('find-all')
  findALl(@Query('status') status?: number) {
    return this.roleService.findAll(status);
  }

  @Get('find-by-id/:roleId')
  findById(
    @Param('roleId') roleId: string,
    @Query('withPermission') withPermission: boolean,
  ) {
    console.log(withPermission, 'wihtpermission');
    return this.roleService.findById(roleId, withPermission);
  }

  @Put('update/:roleId')
  update(@Param('roleId') roleId: string, @Body() data: RoleDto) {
    return this.roleService.update(roleId, data);
  }
}
