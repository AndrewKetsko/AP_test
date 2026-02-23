import { Controller, Get } from '@nestjs/common';
import { ExternalService } from './external.service';

@Controller('external')
export class ExternalController {
  constructor(private readonly externalService: ExternalService) {}
  @Get('courses')
  getExternalCourses() {
    return this.externalService.getExternalCourses();
  }
}
