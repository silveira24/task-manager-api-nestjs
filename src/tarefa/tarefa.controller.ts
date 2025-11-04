import { Body, Controller, Get, Post } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { CreateTarefaDto } from './dtos/create-tarefa-dto';

@Controller('tarefas')
export class TarefaController {
    constructor(private readonly tarefaService: TarefaService) {}

    @Get()
    async listarTarefas() {
        return this.tarefaService.listarTarefas();
    }

    @Post()
    async criarTarefa(@Body() dto: CreateTarefaDto) {
        return await this.tarefaService.criarTarefa(dto);
    }
}
