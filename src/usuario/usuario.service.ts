import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateUsuarioDto } from "./dtos/create-usuario-dto";
import { ResponseUsuarioDto } from "./dtos/reponse-usuario-dto";

@Injectable()
export class UsuarioService {
    constructor(private readonly prisma: PrismaService) { }

    async criarusuario(dto: CreateUsuarioDto): Promise<ResponseUsuarioDto> {
        const usuario =  await this.prisma.usuario.create({
            data: dto,
        });
        const response = {
            id: usuario.id,
            ...(usuario.nome && { nome: usuario.nome }),
            email: usuario.email,
            tipo: usuario.tipo,
        }
        return response;
    }

    async buscarUsuarios(): Promise<ResponseUsuarioDto[]> {
        const usuários = await this.prisma.usuario.findMany();
        const response: ResponseUsuarioDto[] = usuários.map((usuario) => ({
            id: usuario.id,
            ...(usuario.nome && { nome: usuario.nome }),
            email: usuario.email,
            tipo: usuario.tipo,
        }));
        return response;
    }

    async buscarUsuarioPorId(id: number): Promise<ResponseUsuarioDto> {
        const usuario =  await this.prisma.usuario.findUnique({
            where: { id },
        });

        if(!usuario) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado`);
        }
        const response: ResponseUsuarioDto = {
            id: usuario.id,
            ...(usuario.nome && { nome: usuario.nome }),
            email: usuario.email,
            tipo: usuario.tipo,
        }
        return response;
    }

    async buscarUsuarioPorEmail(email: string): Promise<ResponseUsuarioDto> {
        const usuario = await this.prisma.usuario.findUnique({
            where: { email },
        });

        if(!usuario) {
            throw new NotFoundException(`Usuário com email ${email} não encontrado`);
        }

        const response: ResponseUsuarioDto = {
            id: usuario.id,
            ...(usuario.nome && { nome: usuario.nome }),
            email: usuario.email,
            tipo: usuario.tipo,
        }
        return response;
    }
} 