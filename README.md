# Sistema de Gestão de Tarefas Empresariais

###  Sistema moderno para gerenciamento de tarefas e processos internos empresariais

## 🚀 Funcionalidades

- Autenticação e Autorização de Usuários
- Gerenciamento de Tarefas
- API RESTful

## 🛠️ Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) - Framework Node.js progressivo
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação principal
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados
- [Prisma](https://www.prisma.io/) - ORM moderno para Node.js e TypeScript
- [JWT](https://jwt.io/) - Mecanismo de autenticação

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- Node.js 16.x ou superior
- PostgreSQL instalado e rodando
- npm ou yarn como gerenciador de pacotes

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/silveira24/task-manager-api-nestjs.git
cd task-manager-api-nestjs
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

## 💻 Executando a Aplicação

### Modo Desenvolvimento
```bash
# Executar em modo desenvolvimento
npm run start:dev

# Executar em modo debug
npm run start:debug
```

### Modo Produção
```bash
# Construir a aplicação
npm run build

# Iniciar servidor de produção
npm run start:prod
```
