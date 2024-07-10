import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IssueEntity } from "./entites/issue.entity";
import { IssueAbstractRepository } from "./repositories/issue.abstract.repository";
import { IssueRepository } from "./repositories/issue.repository";

@Module({
  imports: [TypeOrmModule.forFeature([IssueEntity])],
  providers: [
    {
      provide: IssueAbstractRepository,
      useClass: IssueRepository,
    },
  ],
  exports: [IssueAbstractRepository],
})
export class IssuePersistenceModule {}
