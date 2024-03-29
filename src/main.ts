import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import nocache from 'nocache';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
   app.setGlobalPrefix('/api');
  await app.listen(3000);

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
