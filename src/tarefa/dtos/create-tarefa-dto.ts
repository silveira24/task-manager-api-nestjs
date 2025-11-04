import { prioridadeTarefa, statusTarefa } from "@prisma/client";
import { IsArray, IsDateString, IsEnum, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTarefaDto {
    @IsString({ message: 'O título deve ser uma string.' })
    @IsNotEmpty({ message: 'O título é obrigatório.' })
    titulo: string;
    @IsString({ message: 'A descrição deve ser uma string.' })
    @IsOptional()
    descricao?: string;
@IsEnum(statusTarefa, { message: `Status inválido. o status deve ser uma da opções: ${Object.values(statusTarefa).join(', ')}` })
    @IsNotEmpty({ message: 'O status é obrigatório.' })
    status: statusTarefa;

    @IsEnum(prioridadeTarefa, { message: `Prioridade inválida. A prioridade deve ser uma das opções: ${Object.values(prioridadeTarefa).join(', ')}` })
    @IsNotEmpty({ message: 'A prioridade é obrigatória.' })
    prioridade: prioridadeTarefa;
    
    @IsDateString({}, { message: 'O prazo deve ser uma data válida em formato ISO 8601.' })
    @IsOptional()
    prazo?: Date;
    
    @IsNumber({}, { message: 'O ID do usuário que criou a tarefa deve ser um número.' })
    @IsNotEmpty({ message: 'O ID do usuário que criou a tarefa é obrigatório.' })
    criadoPorId: number;
    
    @IsArray({ message: 'A lista de IDs dos responsáveis deve ser um array de números.' })
    @IsNumber({}, { each: true, message: 'Cada ID de responsável deve ser um número.' })
    responsaveisIds: number[];
}