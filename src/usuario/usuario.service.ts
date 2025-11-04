import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateUsuarioDto } from "./dtos/create-usuario-dto";

@Injectable()
export class UsuarioService {
    constructor(private readonly prisma: PrismaService) { }

    async criarusuario(dto: CreateUsuarioDto) {
        return await this.prisma.usuario.create({
            data: dto,
        });
    }

    async buscarUsuarios() {
        return await this.prisma.usuario.findMany();
    }

    async buscarUsuarioPorId(id: number) {
        const usuario =  await this.prisma.usuario.findUnique({
            where: { id },
        });

        if(!usuario) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado`);
        }
        return usuario;
    }

    async buscarUsuarioPorEmail(email: string) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { email },
        });

        if(!usuario) {
            throw new NotFoundException(`Usuário com email ${email} não encontrado`);
        }

        return usuario;
    }
} 