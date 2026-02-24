import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { ProductInterface } from './interface/product.interface';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class ExternalService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getExternal(): Promise<(ProductInterface | undefined)[]> {
    let externalData: Partial<ProductInterface[]> | undefined;

    try {
      externalData = (await lastValueFrom(
        this.httpService
          .get<
            ProductInterface[]
          >(this.configService.get<string>('EXTERNAL_URL')!)
          .pipe(
            map((response) =>
              response.data.map(({ id, title, price }) => ({
                id,
                title,
                price,
              })),
            ),
          ),
      )) as Partial<ProductInterface[]>;

      await this.cacheManager.set('externalData', externalData);
    } catch (error) {
      try {
        externalData =
          await this.cacheManager.get<Partial<ProductInterface[]>>(
            'externalData',
          );
      } catch (error) {
        throw new InternalServerErrorException(
          'Failed to fetch external data and retrieve from cache',
        );
      }
      if (!externalData) {
        throw new ServiceUnavailableException(
          'External data is not available and no cached data found',
        );
      }
    }
    return externalData;
  }
}
