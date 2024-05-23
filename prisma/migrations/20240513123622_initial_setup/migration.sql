-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'STARTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "PRIORITY" AS ENUM ('HIGH', 'LOW', 'MEDIUM');

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'OPEN',
    "priority" "PRIORITY" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
