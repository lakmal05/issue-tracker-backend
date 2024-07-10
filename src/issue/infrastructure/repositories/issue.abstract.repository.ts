import { SettingEnum } from "src/common/enum/setting.enum";
import { CreateIssueDto } from "src/issue/dto/create.issue.dto";

export abstract class IssueAbstractRepository {
  abstract delete(issueId: string);
  
  abstract findAll();

  abstract update(issueId: string, data: any);

  abstract create(data: CreateIssueDto);
}
