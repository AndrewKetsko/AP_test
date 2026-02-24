import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/createStudent.dto';
import { StudentIdParamDto } from './dto/studentIdParam.dto';
import { Student } from 'src/db/entity/student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  getStudents(): Promise<Student[]> {
    return this.studentsService.getStudents();
  }

  @Get(':studentId')
  getStudentById(@Param() { studentId }: StudentIdParamDto): Promise<Student> {
    return this.studentsService.getStudentById(studentId);
  }

  @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentsService.createStudent(createStudentDto);
  }
}
