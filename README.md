# Cardápio Digital Multi-Tenant

Sistema de cardápio digital multi-tenant preparado para produção com Docker.

## 🚀 Visão Geral

Este projeto é um sistema completo de cardápio digital que suporta múltiplas empresas (tenants) em uma única instalação. Ideal para SaaS de delivery e restaurantes.

### Funcionalidades Principais

- ✅ **Multi-Tenant**: Múltiplas empresas isoladas no mesmo sistema
- ✅ **Autenticação JWT**: Login seguro com refresh token
- ✅ **Papéis de Usuário**: Admin, Manager e Staff
- ✅ **API RESTful**: Backend robusto com NestJS
- ✅ **Frontend Moderno**: Next.js 14 com App Router
- ✅ **Dockerizado**: Pronto para deploy em VPS
- ✅ **Documentação Swagger**: API docs automáticas
- ✅ **Reverse Proxy**: Nginx configurado para produção

## 📁 Estrutura do Projeto

```
cardapio-digital/
├── backend/           # API NestJS
│   ├── src/
│   │   ├── auth/      # Autenticação e autorização
│   │   ├── tenant/    # Gerenciamento de empresas
│   │   ├── user/      # Gerenciamento de usuários
│   │   └── ...
│   └── Dockerfile
├── frontend/          # Frontend Next.js
│   ├── src/
│   │   ├── app/       # App Router
│   │   ├── components/
│   │   └── lib/
│   └── Dockerfile
├── nginx/             # Configuração Nginx
│   ├── nginx.conf
│   └── conf.d/
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🔧 Pré-requisitos

- Docker e Docker Compose
- VPS com pelo menos 2GB RAM (recomendado 4GB)

## ⚡ Início Rápido

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd cardapio-digital
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Banco de Dados
DB_USERNAME=cardapio_user
DB_PASSWORD=sua_senha_forte_aqui
DB_NAME=cardapio_db

# JWT Secret (gerar uma chave aleatória forte)
JWT_SECRET=sua_chave_secreta_muito_forte_e_aleatoria

# Admin Inicial
ADMIN_EMAIL=admin@cardapio.com
ADMIN_PASSWORD=Admin@123456

# URLs
NEXT_PUBLIC_API_URL=http://localhost:3000
WEB_PORT=3001
NGINX_PORT=80
```

### 3. Inicie os containers

```bash
# Com Nginx (produção)
docker-compose --profile with-nginx up -d

# Sem Nginx (desenvolvimento)
docker-compose up -d
```

### 4. Acesse a aplicação

- **Frontend**: http://localhost:3001 (ou porta configurada)
- **API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api-docs
- **Nginx** (se habilitado): http://localhost:80

## 🏗️ Arquitetura

### Backend (NestJS)

- **Framework**: NestJS 10
- **Banco de Dados**: PostgreSQL 15
- **ORM**: TypeORM
- **Autenticação**: JWT + Passport
- **Validação**: class-validator
- **Documentação**: Swagger/OpenAPI

### Frontend (Next.js)

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Estado**: Zustand
- **Forms**: React Hook Form

### Infraestrutura

- **Containerização**: Docker
- **Orquestração**: Docker Compose
- **Reverse Proxy**: Nginx
- **Banco de Dados**: PostgreSQL com volume persistente

## 🔐 Segurança

- Senhas hasheadas com bcrypt
- JWT com expiração configurável
- CORS configurado
- Validação de entrada em todas as rotas
- Isolamento por tenant

## 📊 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/refresh` - Refresh token

### Tenants (Empresas)
- `GET /api/tenants` - Listar todos os tenants
- `POST /api/tenants` - Criar novo tenant
- `GET /api/tenants/:id` - Buscar tenant por ID
- `GET /api/tenants/slug/:slug` - Buscar tenant por slug
- `PATCH /api/tenants/:id` - Atualizar tenant
- `DELETE /api/tenants/:id` - Remover tenant
- `POST /api/tenants/:id/activate` - Ativar tenant
- `POST /api/tenants/:id/deactivate` - Desativar tenant

### Usuários
- `GET /api/users/me` - Perfil do usuário atual
- `PATCH /api/users/me` - Atualizar perfil
- `GET /api/users` - Listar usuários
- `POST /api/users` - Criar usuário
- `GET /api/users/:id` - Buscar usuário
- `GET /api/users/tenant/:tenantId` - Usuários por tenant
- `PATCH /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Remover usuário

## 🔄 Deploy em Produção

### Na sua VPS:

1. Faça upload dos arquivos do projeto
2. Configure o `.env` com valores de produção
3. Execute `docker-compose --profile with-nginx up -d`
4. Configure seu domínio apontando para o IP da VPS
5. (Opcional) Configure SSL com Let's Encrypt

### Com SSL (Let's Encrypt):

```bash
# Instale certbot
apt-get install certbot python3-certbot-nginx

# Gere o certificado
certbot --nginx -d seudominio.com -d www.seudominio.com
```

## 🛠️ Desenvolvimento

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📝 Próximos Passos (Roadmap)

- [ ] Módulo de cardápios (categorias, produtos, adicionais)
- [ ] Módulo de pedidos
- [ ] Dashboard administrativo
- [ ] Interface do cliente final
- [ ] Integração com pagamentos
- [ ] Notificações em tempo real (WebSockets)
- [ ] Upload de imagens (S3/MinIO)
- [ ] Logs e auditoria

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

MIT License

---

**Desenvolvido com ❤️ para o ecossistema de delivery e restaurantes**
