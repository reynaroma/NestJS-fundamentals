import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// This will enable validation globally for all the endpoints
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // This will enable validation globally for all the endpoints
  // This will validate the incoming request body
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
