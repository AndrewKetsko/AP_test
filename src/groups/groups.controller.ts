import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { AddStudentDto } from './dto/addStudent.dto';
import { CreateGroupDto } from './dto/createGroup.dto';
import { GroupIdParamDto } from './dto/groupIdParam.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  getGroups() {
    return this.groupsService.getGroups();
  }

  @Get('active')
  getActiveGroups() {
    return this.groupsService.getActiveGroups();
  }

  @Get(':groupId')
  getGroupById(@Param() { groupId }: GroupIdParamDto) {
    console.log('Received request for group with id:', groupId);
    return this.groupsService.getGroupById(groupId);
  }

  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Post(':groupId/students')
  addStudentToGroup(
    @Param() { groupId }: GroupIdParamDto,
    @Body() addStudentDto: AddStudentDto,
  ) {
    return this.groupsService.addStudentToGroup({
      groupId,
      addStudentDto,
    });
  }
}
