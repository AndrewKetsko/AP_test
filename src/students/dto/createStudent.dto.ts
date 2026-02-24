import { IsEmail, IsString, Length } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @Length(3, 50)
  name: string;
  @IsEmail()
  email: string;
}
