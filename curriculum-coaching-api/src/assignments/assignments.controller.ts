import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateBulkAssignmentDto } from './dto/create-bulk-assignment.dto';

@Controller('api/assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post('bulk')
  createMany(@Body() createBulkAssignmentDto: CreateBulkAssignmentDto) {
    return this.assignmentsService.createMany(createBulkAssignmentDto);
  }

  @Get()
  findAll() {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('wipe')
  wipeDelete() {
    return this.assignmentsService.wipeDelete();
  }
}
