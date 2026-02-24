import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ExternalService } from './external.service';
import { ProductInterface } from './interface/product.interface';
// import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('external')
export class ExternalController {
  constructor(private readonly externalService: ExternalService) {}

  //if requirements will be changed a little bit, we can easily add cache to this endpoint by using @UseInterceptors(CacheInterceptor) and setting up cache in the module
  // @UseInterceptors(CacheInterceptor)
  @Get()
  getExternal(): Promise<(ProductInterface | undefined)[]> {
    return this.externalService.getExternal();
  }
}
