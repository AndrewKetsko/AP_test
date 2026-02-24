import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { AddStudentDto } from './dto/addStudent.dto';
import { CreateGroupDto } from './dto/createGroup.dto';
import { GroupIdParamDto } from './dto/groupIdParam.dto';
import { Group } from 'src/db/entity/group.entity';
import { Student } from 'src/db/entity/student.entity';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  getGroups(): Promise<Group[]> {
    return this.groupsService.getGroups();
  }

  @Get('active')
  getActiveGroups(): Promise<Group[]> {
    return this.groupsService.getActiveGroups();
  }

  @Get(':groupId')
  getGroupById(@Param() { groupId }: GroupIdParamDto): Promise<Group> {
    return this.groupsService.getGroupById(groupId);
  }

  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Post(':groupId/students')
  addStudentToGroup(
    @Param() { groupId }: GroupIdParamDto,
    @Body() addStudentDto: AddStudentDto,
  ): Promise<Student> {
    return this.groupsService.addStudentToGroup({
      groupId,
      addStudentDto,
    });
  }
}
