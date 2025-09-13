-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'PSYCHOLOGIST', 'STAFF');

-- AlterTable
ALTER TABLE "public"."sessions" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL,
    "psychologistId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_psychologistId_idx" ON "public"."users"("psychologistId");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "public"."psychologists"("id") ON DELETE SET NULL ON UPDATE CASCADE;
