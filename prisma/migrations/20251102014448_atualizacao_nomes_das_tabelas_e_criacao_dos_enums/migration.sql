/*
  Warnings:

  - You are about to drop the `Login` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tarefa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "tipoUsuario" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "statusTarefa" AS ENUM ('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA', 'ATRASADA');

-- CreateEnum
CREATE TYPE "prioridadeTarefa" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');

-- DropForeignKey
ALTER TABLE "CRM"."Login" DROP CONSTRAINT "Login_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "CRM"."Tarefa" DROP CONSTRAINT "Tarefa_criadoPorId_fkey";

-- DropForeignKey
ALTER TABLE "CRM"."_TarefaResponsaveis" DROP CONSTRAINT "_TarefaResponsaveis_A_fkey";

-- DropForeignKey
ALTER TABLE "CRM"."_TarefaResponsaveis" DROP CONSTRAINT "_TarefaResponsaveis_B_fkey";

-- DropTable
DROP TABLE "CRM"."Login";

-- DropTable
DROP TABLE "CRM"."Tarefa";

-- DropTable
DROP TABLE "CRM"."Usuario";

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT,
    "tipo" "tipoUsuario" NOT NULL DEFAULT 'USER',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logins" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarefas" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "status" "statusTarefa" NOT NULL DEFAULT 'PENDENTE',
    "prioridade" "prioridadeTarefa" NOT NULL DEFAULT 'MEDIA',
    "prazo" TIMESTAMP(3),
    "criadoPorId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tarefas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "logins_usuarioId_key" ON "logins"("usuarioId");

-- AddForeignKey
ALTER TABLE "logins" ADD CONSTRAINT "logins_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TarefaResponsaveis" ADD CONSTRAINT "_TarefaResponsaveis_A_fkey" FOREIGN KEY ("A") REFERENCES "tarefas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TarefaResponsaveis" ADD CONSTRAINT "_TarefaResponsaveis_B_fkey" FOREIGN KEY ("B") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
