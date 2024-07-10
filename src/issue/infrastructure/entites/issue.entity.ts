import { IssueStatusEnum } from "src/common/enum/issues-status.enum";
import { StatusEnum } from "src/common/enum/status.enum";
import { EntityRelationalHelper } from "src/utils/relational-entity-helper";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  name: "issue",
})
export class IssueEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  trackingNumber: string;

  @Column({ type: "int", default: StatusEnum.ACTIVE })
  status: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ nullable: true })
  priority: string;

  @Column({ default: IssueStatusEnum.NEW })
  issueStatus: string;

  @Column({ nullable: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
