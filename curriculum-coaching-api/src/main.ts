import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './database/prisma-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const usersService = app.get(UsersService);

  if (!(await usersService.findOneByUsername('admin'))) {
    await usersService.create({
      username: 'admin',
      firstName: 'admin',
      lastName: 'admin',
      role: 'ADMIN',
      password: 'password',
      uniqueId: '00-0000',
      email: 'admin@email.com',
      address: '',
      bio: '',
      contactNumber: null,
      courseId: null,
      departmentId: null,
      yearLevel: null,
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
