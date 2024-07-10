import { IsEmail, IsEnum, IsString } from "class-validator";
import { IssueStatusEnum } from "src/common/enum/issues-status.enum";
import { PriorityEnum } from "src/common/enum/priority.enum";

export class CreateIssueDto {
  @IsString()
  title: string;
  
  @IsString()
  description: string;

  @IsEnum(PriorityEnum)
  priority: PriorityEnum;

  @IsEnum(IssueStatusEnum)
  issueStatus: IssueStatusEnum;

  @IsEmail()
  email: string;
}
