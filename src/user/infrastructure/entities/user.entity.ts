import { StatusEnum } from 'src/common/enum/status.enum';
import { RoleEntity } from 'src/role-permission-management/role/infrastructure/entites/role.entity';
import { StaffEntity } from 'src/staff/infrastructure/entites/staff.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: String, nullable: true })
  username: string;

  @Column({ type: String, nullable: true })
  password: string;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  email: string;

  @Column({ default: StatusEnum.ACTIVE, nullable: true })
  status: number;

  @Column({ type: String, nullable: true })
  deviceId: string;

  @Column({ type: String, nullable: true })
  fcmToken: string;

  @OneToOne(() => StaffEntity, (staff) => staff.user)
  staff: StaffEntity;

  @ManyToOne(() => RoleEntity, (role) => role.user)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity | null;





  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
