/*
  Warnings:

  - Added the required column `animal` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Animal" AS ENUM ('CAT', 'DOG', 'BIRD', 'COW', 'GOAT', 'OTHERS');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "animal" "Animal" NOT NULL;
