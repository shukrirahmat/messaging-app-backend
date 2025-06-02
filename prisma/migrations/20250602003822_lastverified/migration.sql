/*
  Warnings:

  - You are about to drop the column `lastLogDate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastLogDate",
ADD COLUMN     "lastVerified" TIMESTAMP(3);
