import { Role, YearLevel } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  uniqueId: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  contactNumber: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @IsInt()
  @IsOptional()
  courseId: number;

  @IsInt()
  @IsOptional()
  departmentId: number;

  @IsEnum(YearLevel)
  @IsOptional()
  yearLevel: YearLevel;
}
