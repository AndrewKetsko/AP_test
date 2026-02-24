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

  getStudents(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  getStudentById(studentId: string): Promise<Student | null> {
    return this.studentsRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.group', 'group')
      .where('student.id = :studentId', { studentId })
      .getOne();
  }

  createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentsRepository.create(createStudentDto);
    return this.studentsRepository.save(student);
  }

  addStudentToGroup(student: Student): Promise<Student> {
    return this.studentsRepository.save(student);
  }
}
