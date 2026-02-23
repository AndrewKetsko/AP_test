import { Injectable } from '@nestjs/common';
import { StudentsRepository } from './students.repository';
import { CreateStudentDto } from './dto/createStudent.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  getStudents() {
    return this.studentsRepository.getStudents();
  }

  createStudent(createStudentDto: CreateStudentDto) {
    return this.studentsRepository.createStudent(createStudentDto);
  }
}
