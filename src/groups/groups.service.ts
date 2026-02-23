import { Injectable } from '@nestjs/common';
import { GroupsRepository } from './groups.repository';
import { AddStudentDto } from './dto/addStudent.dto';
import { CreateGroupDto } from './dto/createGroup.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  getGroups() {
    return this.groupsRepository.getGroups();
  }

  getActiveGroups() {
    return this.groupsRepository.getActiveGroups();
  }

  getGroupById(id: string) {
    return this.groupsRepository.getGroupById(id);
  }

  createGroup(createGroupDto: CreateGroupDto) {
    return this.groupsRepository.createGroup(createGroupDto);
  }

  addStudentToGroup({
    groupId,
    addStudentDto: { studentId },
  }: {
    groupId: string;
    addStudentDto: AddStudentDto;
  }) {
    return this.groupsRepository.addStudentToGroup({ groupId, studentId });
  }
}
