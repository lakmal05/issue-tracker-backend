import { Injectable } from "@nestjs/common";
import { CreateIssueDto } from "./dto/create.issue.dto";
import { IssueAbstractRepository } from "./infrastructure/repositories/issue.abstract.repository";

@Injectable()
export class IssueService {
  constructor(private readonly issueRepository: IssueAbstractRepository) {}

  findAll() {
    return this.issueRepository.findAll();
  }

  create(data: CreateIssueDto) {
    return this.issueRepository.create(data);
  }

  update(issueId, data) {
    return this.issueRepository.update(issueId, data);
  }
  delete(issueId: string) {
    return this.issueRepository.delete(issueId);
  }
}
