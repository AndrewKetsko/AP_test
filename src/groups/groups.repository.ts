import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/db/entity/group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/createGroup.dto';

@Injectable()
export class GroupsRepository {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  getGroups() {
    return this.groupRepository.find();
  }

  getActiveGroups() {
    return this.groupRepository
      .createQueryBuilder('group')
      .leftJoin('group.students', 'student')
      .where('group.startDate <= :currentDate', { currentDate: new Date() })
      .groupBy('group.id')
      .having('COUNT(student.id) >= 5')
      .getMany();
  }

  getGroupById(id: string) {
    return this.groupRepository.findOneBy({ id });
  }

  createGroup(createGroupDto: CreateGroupDto) {
    const group = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(group);
  }

  addStudentToGroup({
    groupId,
    studentId,
  }: {
    groupId: string;
    studentId: string;
  }) {
    return this.groupRepository
      .createQueryBuilder()
      .relation(Group, 'students')
      .of(groupId)
      .add(studentId);
  }
}
