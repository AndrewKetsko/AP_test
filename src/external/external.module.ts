import { Module } from '@nestjs/common';
import { ExternalController } from './external.controller';
import { ExternalService } from './external.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    CacheModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        isGlobal: true,
        ttl: configService.get('CACHE_TTL') || 300,
      }),
    }),
  ],
  controllers: [ExternalController],
  providers: [ExternalService],
})
export class ExternalModule {}
