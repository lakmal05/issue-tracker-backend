import { Injectable } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IssueAbstractRepository } from "./issue.abstract.repository";
import { IssueEntity } from "../entites/issue.entity";
import { CreateIssueDto } from "src/issue/dto/create.issue.dto";
import { StatusEnum } from "src/common/enum/status.enum";

@Injectable()
export class IssueRepository implements IssueAbstractRepository {
  constructor(
    @InjectRepository(IssueEntity)
    private readonly issueRepository: Repository<IssueEntity>
  ) {}

  delete(issueId: string) {
    return this.issueRepository.update(
      { id: issueId },
      { status: StatusEnum.INACTIVE }
    );
  }

  findAll() {
    return this.issueRepository.find({ where: { status: StatusEnum.ACTIVE } });
  }

  update(issueId: string, data: any) {
    return this.issueRepository.update(
      {
        id: issueId,
      },
      {
        priority: data.priority,
        issueStatus: data.issueStatus,
        title: data.title,
        description: data.description,
      }
    );
  }

  create(data: CreateIssueDto) {
    return this.issueRepository.save({
      title: data.title,
      description: data.description,
      email: data?.email,
      priority: data.priority,
      issueStatus: data.issueStatus,
      trackingNumber: Math.floor(Math.random() * 100000) + (1).toString(),
    });
  }
}
