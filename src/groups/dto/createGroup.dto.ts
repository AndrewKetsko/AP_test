import { IsDateString, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name: string;
  @IsDateString()
  startDate: Date;
}
