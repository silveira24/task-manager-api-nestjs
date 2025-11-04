import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTarefaDto } from './dtos/create-tarefa-dto';
import { ResponseTarefaDto } from './dtos/response-tarefa-dto';

@Injectable()
export class TarefaService {
    constructor(private readonly prisma: PrismaService) { }

    async criarTarefa(dto: CreateTarefaDto): Promise<ResponseTarefaDto> {

        const criador = await this.prisma.usuario.findUnique({ where: { id: dto.criadoPorId } })

        if (! criador) {
            throw new NotFoundException(`Usuário criador (id: ${dto.criadoPorId}) não encontrado.`);
        }
        
        const responsaveis = await this.prisma.usuario.findMany({
            where: { id: { in: dto.responsaveisIds } }
        });

        if (responsaveis.length !== dto.responsaveisIds.length) {
            throw new NotFoundException(`Um ou mais usuários responsáveis não foram encontrados.`);
        }

        const tarefa = await this.prisma.tarefa.create({
            data: {
                titulo: dto.titulo,
                descricao: dto.descricao,
                status: dto.status,
                prioridade: dto.prioridade,
                prazo: dto.prazo,
                criadoPorId: dto.criadoPorId,
                responsaveis: {
                    connect: dto.responsaveisIds.map(id => ({ id })),
                },
            },
        });

        const response: ResponseTarefaDto = {
            id: tarefa.id,
            titulo: tarefa.titulo,
            ...(tarefa.descricao && { descricao: tarefa.descricao }),
            status: tarefa.status,
            prioridade: tarefa.prioridade,
            ...(tarefa.prazo && { prazo: tarefa.prazo }),
            criadoPor: criador.email,
            responsaveis: responsaveis.map(r => r.email),
        }

        return response;
    }

    
    async listarTarefas(): Promise<ResponseTarefaDto[]> {
        const tarefas = await this.prisma.tarefa.findMany({
            include: { responsaveis: true }
        });
        const response: ResponseTarefaDto[] = [];
        for (const tarefa of tarefas) {
            const criador = await this.prisma.usuario.findUnique({ where: { id: tarefa.criadoPorId } });
            if (! criador) {
                throw new NotFoundException(`Usuário criador (id: ${tarefa.criadoPorId}) não encontrado.`);
            }
            response.push({
                id: tarefa.id,
                titulo: tarefa.titulo,
                ...(tarefa.descricao && { descricao: tarefa.descricao }),
                status: tarefa.status,
                prioridade: tarefa.prioridade,
                ...(tarefa.prazo && { prazo: tarefa.prazo }),
                criadoPor: criador.email,
                responsaveis: tarefa.responsaveis.map(r => r.email),
            });
        }
        return response;
    } 
}
