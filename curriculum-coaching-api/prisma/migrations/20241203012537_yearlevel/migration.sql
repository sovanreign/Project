-- CreateEnum
CREATE TYPE "YearLevel" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "yearLevel" "YearLevel" DEFAULT 'FIRST';
