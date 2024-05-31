/*
  Warnings:

  - You are about to drop the `Apartamentos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Apartamentos";

-- CreateTable
CREATE TABLE "ap" (
    "id" TEXT NOT NULL,
    "ap" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blocosId" TEXT NOT NULL,

    CONSTRAINT "ap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ap_blocosId_key" ON "ap"("blocosId");

-- AddForeignKey
ALTER TABLE "ap" ADD CONSTRAINT "ap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ap" ADD CONSTRAINT "ap_blocosId_fkey" FOREIGN KEY ("blocosId") REFERENCES "Blocos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
