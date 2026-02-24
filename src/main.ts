import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for all origins if needed. Uncomment the line below to allow cross-origin requests.
  // app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
