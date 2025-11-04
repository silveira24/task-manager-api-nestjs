import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dtos/create-usuario-dto';
import { ResponseUsuarioDto } from './dtos/reponse-usuario-dto';

@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    async criarUsuario(@Body() dto: CreateUsuarioDto): Promise<ResponseUsuarioDto> {
        return await this.usuarioService.criarusuario(dto);
    }

    @Get()
    async buscarUsuarios(@Query('email') email: string): Promise<ResponseUsuarioDto | ResponseUsuarioDto[]> {

        if (email) {
            return await this.usuarioService.buscarUsuarioPorEmail(email);
        }

        return await this.usuarioService.buscarUsuarios();
    }

    @Get(':id')
    async buscarUsuarioPorId(@Param('id') id: string): Promise<ResponseUsuarioDto> {
        return await this.usuarioService.buscarUsuarioPorId(+id);
    }

    
}
