import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBulkAssignmentDto } from './dto/create-bulk-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(private db: DatabaseService) {}

  async createMany(createBulkAssignmentDto: CreateBulkAssignmentDto) {
    return this.db.assignment.createMany({
      data: createBulkAssignmentDto.assignments,
      skipDuplicates: true,
    });
  }

  async updateMany() {}

  async wipeDelete() {
    return this.db.assignment.deleteMany();
  }
}
