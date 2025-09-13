/*
  Warnings:

  - Made the column `name` on table `patients` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `patients` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthDate` on table `patients` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'RESCHEDULED', 'CANCELED');

-- AlterTable
ALTER TABLE "public"."patients" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "birthDate" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."appointments" (
    "id" UUID NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "status" "public"."AppointmentStatus" NOT NULL,
    "psychologistId" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "appointments_psychologistId_idx" ON "public"."appointments"("psychologistId");

-- CreateIndex
CREATE INDEX "appointments_patientId_idx" ON "public"."appointments"("patientId");

-- AddForeignKey
ALTER TABLE "public"."appointments" ADD CONSTRAINT "appointments_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "public"."psychologists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."appointments" ADD CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
