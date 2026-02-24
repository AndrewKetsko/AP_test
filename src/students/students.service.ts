import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { StudentsRepository } from './students.repository';
import { CreateStudentDto } from './dto/createStudent.dto';
import { Student } from 'src/db/entity/student.entity';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  getStudents(): Promise<Student[]> {
    return this.studentsRepository.getStudents();
  }

  async getStudentById(studentId: string): Promise<Student> {
    let student: Student | null;
    try {
      student = await this.studentsRepository.getStudentById(studentId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to get student');
    }
    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }
    return student;
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    let student: Student;
    try {
      student = await this.studentsRepository.createStudent(createStudentDto);
    } catch (error) {
      if ((error.code = '23505')) {
        throw new ConflictException(
          'Student with the same email already exists',
        );
      }
      throw new InternalServerErrorException('Failed to create student');
    }
    return student;
  }

  addStudentToGroup(student: Student): Promise<Student> {
    return this.studentsRepository.addStudentToGroup(student);
  }
}
