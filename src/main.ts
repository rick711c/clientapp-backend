import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as nocache from 'nocache';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('/api');
  app.enableCors();
  app.use(helmet());
  app.use(nocache());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      validationError: { target: false },
    }),
  );
  await app.listen(3000);
}
bootstrap();
