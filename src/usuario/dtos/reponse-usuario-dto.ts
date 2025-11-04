import { tipoUsuario } from "@prisma/client";

export class ResponseUsuarioDto {
    id: number;
    email: string;
    nome?: string;
    tipo: tipoUsuario;
}