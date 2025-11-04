import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dtos/create-usuario-dto';
import { ResponseUsuarioDto } from './dtos/reponse-usuario-dto';

@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    async criarUsuario(@Body() dto: CreateUsuarioDto) {
        const usuario = await this.usuarioService.criarusuario(dto);
        const response: ResponseUsuarioDto = {
            id: usuario.id,
            email: usuario.email,
            tipo: usuario.tipo,
            ...(usuario.nome && { nome: usuario.nome }),
        }
        return response;
    }

    @Get()
    async buscarUsuarios(@Query('email') email: string) {

        if (email) {
            const usuario = await this.usuarioService.buscarUsuarioPorEmail(email);
            const response: ResponseUsuarioDto = {
                id: usuario.id,
                email: usuario.email,
                ...(usuario.nome && { nome: usuario.nome }),
                tipo: usuario.tipo,
            }
            return response;
        }

        const usuarios = await this.usuarioService.buscarUsuarios();
        const response: ResponseUsuarioDto[] = usuarios.map(usuario => ({
            id: usuario.id,
            email: usuario.email,
            ...(usuario.nome && { nome: usuario.nome }),    
            tipo: usuario.tipo,
        }));
        return response;
    }

    @Get(':id')
    async buscarUsuarioPorId(@Param('id') id: string) {
        const usuario = await this.usuarioService.buscarUsuarioPorId(+id);
        const response: ResponseUsuarioDto = {
            id: usuario.id,
            email: usuario.email,
            ...(usuario.nome && { nome: usuario.nome }),
            tipo: usuario.tipo,
        }
        return response;
    }

    
}
