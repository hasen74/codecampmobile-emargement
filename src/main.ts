import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AfternoonSeedService } from './seed/afternoonSeeder';
import { MorningSeedService } from './seed/morningSeeder';
import { StudentSeedService } from './seed/studentSeeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  /*const afternoonService = app.get(AfternoonSeedService);
  await afternoonService.seedData();
  const morningService = app.get(MorningSeedService);
  await morningService.seedData();
  const studentService = app.get(StudentSeedService);
  await studentService.seedData();*/

  await app.listen(process.env.DB_PORT);
}
bootstrap();
