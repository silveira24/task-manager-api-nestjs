/*
  Warnings:

  - The primary key for the `logins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `logins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "logins" DROP CONSTRAINT "logins_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "logins_pkey" PRIMARY KEY ("usuarioId");
