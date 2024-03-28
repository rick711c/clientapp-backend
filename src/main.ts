import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
   app.setGlobalPrefix('/api');
  await app.listen(3000);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({whitelist: true,transform: true}));
}
bootstrap();
