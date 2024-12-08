import { PartialType } from '@nestjs/mapped-types';
import { CreateBulkAssignmentDto } from './create-bulk-assignment.dto';

export class UpdateBulkAssignmentDto extends PartialType(
  CreateBulkAssignmentDto,
) {}
