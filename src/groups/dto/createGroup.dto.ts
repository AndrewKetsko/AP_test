import { IsDateString, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;
  @IsDateString()
  startDate: Date;
}
