/*
  Warnings:

  - Added the required column `tipo` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "tipo" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Apartamentos" (
    "id" TEXT NOT NULL,
    "ap" TEXT NOT NULL,

    CONSTRAINT "Apartamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blocos" (
    "id" TEXT NOT NULL,
    "block" TEXT NOT NULL,

    CONSTRAINT "Blocos_pkey" PRIMARY KEY ("id")
);
