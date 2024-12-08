import { IsArray, ValidateNested } from 'class-validator';
import { CreateAssignmentDto } from './create-assignment.dto';
import { Type } from 'class-transformer';

export class CreateBulkAssignmentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAssignmentDto)
  assignments: CreateAssignmentDto[];
}
