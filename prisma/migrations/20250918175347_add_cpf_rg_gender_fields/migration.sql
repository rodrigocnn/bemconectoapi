-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MASCULINO', 'FEMININO');

-- AlterTable
ALTER TABLE "public"."patients" ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "gender" "public"."Gender",
ADD COLUMN     "rg" TEXT;
