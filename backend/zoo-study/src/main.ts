import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app
    .listen(3001)
    .then(() => {
      console.log('successfully stared on port 3001');
    })
    .catch((error) => {
      console.log(error);
    });
}
bootstrap();
