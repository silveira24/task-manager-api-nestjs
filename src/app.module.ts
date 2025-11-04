import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from 'prisma/prisma.module';
import { TarefaModule } from './tarefa/tarefa.module';

@Module({
  imports: [UsuarioModule, PrismaModule, TarefaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
