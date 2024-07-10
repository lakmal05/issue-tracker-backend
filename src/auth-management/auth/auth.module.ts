import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { RolePermissionModule } from 'src/role-permission-management/role-permission/role-permission.module';

@Module({
  imports: [UserModule,  RolePermissionModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
