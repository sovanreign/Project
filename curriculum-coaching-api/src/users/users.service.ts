import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { Course, Prisma, Role, YearLevel } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userInfo } = createUserDto;

    const SALT = 12;
    const passwordHashed = await bcrypt.hash(password, SALT);

    return this.db.user.create({
      data: {
        password: passwordHashed,
        ...userInfo,
      },
    });
  }

  findAll(
    q?: string,
    filterByRole?: string,
    filterByYearLevel?: string,
    filterByCourse?: number,
  ) {
    const where: Prisma.UserWhereInput = {};

    // Search query filter
    if (q) {
      where.OR = [
        {
          firstName: { contains: q, mode: 'insensitive' },
        },
        {
          lastName: { contains: q, mode: 'insensitive' },
        },
        {
          uniqueId: { contains: q, mode: 'insensitive' },
        },
      ];
    }

    // Role filter
    if (filterByRole && Object.values(Role).includes(filterByRole as Role)) {
      where.role = filterByRole as Role;
    }

    // Year level filter
    if (
      filterByYearLevel &&
      Object.values(YearLevel).includes(filterByYearLevel as YearLevel)
    ) {
      where.yearLevel = filterByYearLevel as YearLevel;
    }

    // Course filter
    if (filterByCourse) {
      where.courseId = filterByCourse;
    }

    return this.db.user.findMany({
      where,
      include: {
        assignmentsAsCoach: {
          include: {
            student: true,
          },
        },
        assignmentsAsStudent: {
          include: {
            coach: true,
          },
        },
      },
      orderBy: {
        firstName: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.db.user.findUniqueOrThrow({
      where: { id },
    });
  }

  findOneByUsername(username: string) {
    return this.db.user.findFirst({
      where: { username },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.db.user.delete({ where: { id } });
  }
}
