import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/db/entity/group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/createGroup.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GroupsRepository {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly configService: ConfigService,
  ) {}

  getGroups(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  getActiveGroups(): Promise<Group[]> {
    return this.groupRepository
      .createQueryBuilder('group')
      .leftJoin('group.students', 'student')
      .where('group.startDate <= :currentDate', { currentDate: new Date() })
      .groupBy('group.id')
      .having('COUNT(student.id) >= :minStudents', {
        minStudents:
          this.configService.get<number>('MIN_STUDENTS_PER_GROUP') || 5,
      })
      .getMany();
  }

  getGroupById(id: string): Promise<Group | null> {
    return this.groupRepository.findOneBy({ id });
  }

  createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(group);
  }
}
