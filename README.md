# Sistema HEMOSE - Prontuário Eletrônico

Sistema de Prontuário Eletrônico para o HEMOSE, desenvolvido com React.js (Next.js) no frontend e NestJS no backend.

## Visão Geral

O Sistema de Prontuário Eletrônico do HEMOSE digitaliza e centraliza os registros médicos e administrativos, garantindo acesso rápido, seguro e eficiente às informações clínicas. O sistema melhora o atendimento ao paciente e promove um ambiente mais seguro e organizado.

## Tecnologias Utilizadas

### Frontend
- **Framework**: React.js com Next.js
- **Estilização**: Tailwind CSS
- **Gerenciamento de Estado**: React Hooks

### Backend
- **Framework**: NestJS (Node.js)
- **ORM**: TypeORM
- **Banco de Dados**: MySQL
- **Autenticação**: JWT (JSON Web Token)

## Funcionalidades Principais

- **Autenticação e Controle de Acesso**
  - Login e logout
  - Autenticação JWT
  - Controle de acesso baseado em perfis (admin, médico, enfermeira, recepcionista)
  - Redirecionamento para interfaces específicas por tipo de usuário

- **Módulo de Administração**
  - Dashboard administrativo
  - CRUD completo para gerenciamento de usuários
  - Visualização de estatísticas do sistema

- **Módulo de Médico**
  - Dashboard médico
  - Acesso a prontuários
  - Gerenciamento de prescrições
  - Controle de internações

- **Módulo de Enfermagem**
  - Dashboard de enfermagem
  - Triagem de pacientes
  - Administração de medicamentos
  - Controle de leitos
  - Registro de sinais vitais

- **Módulo de Recepção**
  - Dashboard de recepção
  - Cadastro de pacientes
  - Gerenciamento de agendamentos
  - Check-in de pacientes
  - Cadastro de acompanhantes

## Estrutura do Projeto

```
hemose-project/
├── backend/                 # Aplicação NestJS
│   ├── src/
│   │   ├── auth/            # Módulo de autenticação
│   │   ├── users/           # Módulo de usuários
│   │   ├── config/          # Configurações
│   │   └── ...
│   └── ...
└── frontend/                # Aplicação Next.js
    ├── app/                 # Páginas da aplicação
    │   ├── admin/           # Interface de administrador
    │   ├── medico/          # Interface de médico
    │   ├── enfermeira/      # Interface de enfermeira
    │   ├── recepcionista/   # Interface de recepcionista
    │   └── ...
    ├── components/          # Componentes reutilizáveis
    ├── lib/                 # Utilitários e hooks
    └── ...
```

## Instalação e Execução

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn
- MySQL

### Backend
1. Navegue até a pasta do backend:
   ```
   cd hemose-project/backend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure o arquivo `.env` com as credenciais do banco de dados:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=password
   DB_DATABASE=hemose_db
   JWT_SECRET=your-secret-key
   JWT_EXPIRATION_TIME=3600s
   ```

4. Inicie o servidor:
   ```
   npm run start
   ```

### Frontend
1. Navegue até a pasta do frontend:
   ```
   cd hemose-project/frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

4. Acesse a aplicação em `http://localhost:3000`

## Usuários do Sistema

O sistema possui quatro tipos de usuários:

1. **Administrador**: Gerencia usuários e tem acesso a todas as funcionalidades administrativas.
2. **Médico**: Acessa prontuários, cria prescrições e gerencia internações.
3. **Enfermeira**: Realiza triagem, administra medicamentos e monitora sinais vitais.
4. **Recepcionista**: Cadastra pacientes, gerencia agendamentos e realiza check-in.

## Segurança

- Senhas armazenadas com hash e salt usando bcrypt
- Autenticação via tokens JWT
- Controle de acesso baseado em perfis
- Proteção de rotas no frontend e backend

## Contribuição

Este projeto foi desenvolvido como parte de um sistema de prontuário eletrônico para o HEMOSE. Para contribuir, por favor, entre em contato com a equipe de desenvolvimento.
