import { prioridadeTarefa, statusTarefa } from "@prisma/client";

export class ResponseTarefaDto {
    id: number;
    titulo: string;
    descricao?: string;
    status: statusTarefa;
    prioridade: prioridadeTarefa;
    prazo?: Date;
    criadoPor: string;
    responsaveis?: string[];
}