/*
  Warnings:

  - You are about to drop the column `barangay` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "barangay",
DROP COLUMN "city",
DROP COLUMN "postalCode",
ADD COLUMN     "address" TEXT;
