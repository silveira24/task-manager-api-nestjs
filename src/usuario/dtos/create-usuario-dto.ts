import { tipoUsuario } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUsuarioDto {
    @IsEmail({}, {message: 'email inválido'})
    @IsNotEmpty({message: 'email é obrigatório'})
    email: string;

    @IsString({message: 'nome deve ser uma string'})
    @IsOptional()
    nome?: string;
    
    @IsEnum(tipoUsuario, {
        message: `tipo só pode ser: ${Object.values(tipoUsuario).join(', ')}`,
    })
    @IsNotEmpty({message: 'tipo é obrigatório'})
    tipo: tipoUsuario;

}