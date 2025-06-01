/*
  Warnings:

  - Added the required column `lastLogDate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isLoggedIn" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastLogDate" TIMESTAMP(3) NOT NULL;
