import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/db/entity/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/createStudent.dto';

@Injectable()
export class StudentsRepository {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  getStudents() {
    return this.studentsRepository.find();
  }

  createStudent(createStudentDto: CreateStudentDto) {
    const student = this.studentsRepository.create(createStudentDto);
    return this.studentsRepository.save(student);
  }
}
