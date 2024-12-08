/*
  Warnings:

  - The `course` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `yearLevel` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "YearLevel" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH');

-- CreateEnum
CREATE TYPE "Course" AS ENUM ('BSIT', 'BSCS');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "course",
ADD COLUMN     "course" "Course",
DROP COLUMN "yearLevel",
ADD COLUMN     "yearLevel" "YearLevel";
