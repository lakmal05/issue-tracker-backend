import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { IssueService } from "./issue.service";
import { CreateIssueDto } from "./dto/create.issue.dto";

@Controller("issue")
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post("create")
  create(@Body() data: CreateIssueDto) {
    return this.issueService.create(data);
  }
  @Put("update/:issueId")
  update(@Param("issueId") issueId: string, @Body() data) {
    return this.issueService.update(issueId, data);
  }

  @Get("find-all")
  findAll() {
    return this.issueService.findAll();
  }

  @Patch('delete/"issueId')
  delete(@Param("issueId") issueId: string) {
    return this.issueService.delete(issueId);
  }
}
