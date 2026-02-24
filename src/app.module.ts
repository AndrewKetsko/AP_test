import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { GroupsModule } from './groups/groups.module';
import { StudentsModule } from './students/students.module';
import { ExternalModule } from './external/external.module';
import { ErrorException } from './exception/error.exception';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        entities: [__dirname + '/db/entity/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        subscribers: [],
        ssl: { rejectUnauthorized: true },
      }),
      dataSourceFactory: (options: DataSourceOptions) => {
        const dataSource = new DataSource(options);
        return dataSource.initialize();
      },
    }),
    GroupsModule,
    StudentsModule,
    ExternalModule,
  ],
  controllers: [],
  providers: [
    { provide: 'APP_PIPE', useValue: new ValidationPipe({ whitelist: true }) },
    { provide: 'APP_FILTER', useClass: ErrorException },
  ],
})
export class AppModule {}
