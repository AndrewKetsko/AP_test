import { IsUUID } from 'class-validator';

export class StudentIdParamDto {
  @IsUUID()
  studentId: string;
}
