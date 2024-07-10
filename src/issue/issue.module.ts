import { Module } from "@nestjs/common";
import { IssueService } from "./issue.service";
import { IssueController } from "./issue.controller";
import { IssuePersistenceModule } from "./infrastructure/setting-persistence.module";

@Module({
  imports: [IssuePersistenceModule],
  controllers: [IssueController],
  providers: [IssueService],
})
export class IssueModule {}
