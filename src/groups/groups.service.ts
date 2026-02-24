import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GroupsRepository } from './groups.repository';
import { AddStudentDto } from './dto/addStudent.dto';
import { CreateGroupDto } from './dto/createGroup.dto';
import { Group } from 'src/db/entity/group.entity';
import { Student } from 'src/db/entity/student.entity';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class GroupsService {
  constructor(
    private readonly groupsRepository: GroupsRepository,
    private readonly studentService: StudentsService,
  ) {}

  getGroups(): Promise<Group[]> {
    try {
      return this.groupsRepository.getGroups();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve groups');
    }
  }

  getActiveGroups(): Promise<Group[]> {
    try {
      return this.groupsRepository.getActiveGroups();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve active groups',
      );
    }
  }

  async getGroupById(id: string): Promise<Group> {
    let group: Group | null;
    try {
      group = await this.groupsRepository.getGroupById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve group with id ${id}`,
      );
    }
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }
    return group;
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    let group: Group;
    try {
      group = await this.groupsRepository.createGroup(createGroupDto);
    } catch (error) {
      if ((error.code = '23505')) {
        throw new ConflictException(
          `Group with name ${createGroupDto.name} already exists`,
        );
      }
      throw new InternalServerErrorException(
        `Failed to create group with name ${createGroupDto.name}`,
      );
    }
    return group;
  }

  async addStudentToGroup({
    groupId,
    addStudentDto: { studentId },
  }: {
    groupId: string;
    addStudentDto: AddStudentDto;
  }): Promise<Student> {
    let group: Group | null;
    let student: Student | null;

    try {
      group = await this.getGroupById(groupId);
      student = await this.studentService.getStudentById(studentId);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve group with id ${groupId} or student with id ${studentId}`,
      );
    }

    if (!group) {
      throw new NotFoundException(`Group with id ${groupId} not found`);
    }

    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }

    if (student.group && student.group.id === groupId) {
      throw new ConflictException(
        `Student with id ${studentId} is already in group with id ${groupId}`,
      );
    }

    student.group = group;

    try {
      return this.studentService.addStudentToGroup(student);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to add student with id ${studentId} to group with id ${groupId}`,
      );
    }
  }
}
