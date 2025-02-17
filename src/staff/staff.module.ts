import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { StaffPersistenceModule } from './infrastructure/staff-persistence.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [StaffPersistenceModule , UserModule],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
