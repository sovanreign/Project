import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CoursesService {
  constructor(private db: DatabaseService) {}

  create(createCourseDto: CreateCourseDto) {
    return this.db.course.create({
      data: createCourseDto,
    });
  }

  findAll() {
    return this.db.course.findMany({
      include: {
        department: true,
      },
    });
  }

  findOne(id: number) {
    return this.db.course.findUniqueOrThrow({
      where: { id },
      include: { department: true },
    });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.db.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  remove(id: number) {
    return this.db.course.delete({ where: { id } });
  }
}
