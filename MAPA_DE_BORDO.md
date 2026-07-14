# 🗺️ Mapa de Bordo - Cardápio Digital Multi-Tenant

> **Objetivo:** Documento vivo que rastreia o progresso, pendências e futuro do projeto. Deve ser atualizado a cada nova entrega ou mudança significativa.

---

## 📋 Visão Geral do Projeto

**Nome do Projeto:** Cardápio Digital Multi-Tenant  
**Arquitetura:** Microservices monolítico modular (NestJS + Next.js)  
**Infraestrutura:** Dockerizado para deploy fácil em VPS  
**Modelo de Negócio:** SaaS Multi-tenant (B2B2C)  
**Pagamentos:** Somente na entrega (Pago no ato da entrega/retirada)  

### Stack Tecnológica
- **Backend:** NestJS (Node.js), TypeORM, PostgreSQL, JWT Auth
- **Frontend:** Next.js 14 (App Router), TailwindCSS, Lucide React (Ícones)
- **Infra:** Docker, Docker Compose, Nginx (Reverse Proxy)
- **Design System:** Cores temáticas "Food Delivery" (Vermelho/Laranja), UI Moderna

---

## ✅ O Que Foi Feito (Concluído)

### 1. Estrutura Base & Infraestrutura
- [x] Definição da arquitetura de diretórios (`backend`, `frontend`, `nginx`).
- [x] Configuração do **Docker Compose** com perfis para desenvolvimento e produção (`with-nginx`).
- [x] Criação do arquivo `.env.example` com todas as variáveis necessárias.
- [x] Configuração do **Nginx** como reverse proxy para roteamento de portas.
- [x] Documentação inicial (`README.md`) e este Mapa de Bordo.

### 2. Backend (NestJS)
- [x] Setup inicial do NestJS com TypeORM e PostgreSQL.
- [x] **Módulo de Autenticação:** Login, Registro, JWT Strategy, Guards.
- [x] **Módulo Multi-Tenant:** Entidade `Tenant` (Empresa), isolamento lógico via middleware/decorators.
- [x] **Módulo de Usuários:** CRUD de usuários vinculado ao Tenant.
- [x] **Módulo de Cardápio (Menu):**
    - [x] Entidades: `Category`, `MenuItem`.
    - [x] Relacionamento: Categoria -> Itens.
    - [x] Campos: Nome, descrição, preço, imagem (URL), disponibilidade.
- [x] **Módulo de Pedidos (Orders):**
    - [x] Entidades: `Order`, `OrderItem`.
    - [x] Status do pedido (Pendente, Em Preparo, Pronto, Saiu para Entrega, Concluído).
    - [x] Tipo de atendimento (Delivery, Retirada, Mesa).
    - [x] Observações do cliente.
- [x] Documentação automática da API com **Swagger/OpenAPI** (`/api-docs`).

### 3. Frontend (Next.js)
- [x] Setup do Next.js 14 com App Router e TailwindCSS.
- [x] Integração com biblioteca de ícones **Lucide React**.
- [x] **Landing Page:** Página inicial institucional para venda do SaaS.
- [x] **Página de Login Unificada:**
    - [x] Design moderno com gradiente vermelho.
    - [x] Formulário com validação e toggle de senha.
    - [x] Redirecionamento automático baseado no role (Admin ou Restaurante).
    - [x] Credenciais de teste exibidas na UI.
- [x] **Dashboard Administrativo (Admin):**
    - [x] Sidebar responsiva com menu completo.
    - [x] Cards de estatísticas (Empresas, Usuários, Cardápios, Pedidos).
    - [x] Listagem de atividade recente.
    - [x] Perfil do usuário e logout.
- [x] **Dashboard do Restaurante:**
    - [x] Sidebar com navegação específica do restaurante.
    - [x] Stats em tempo real (Pedidos hoje, Em preparo, Faturamento).
    - [x] Lista de pedidos recentes com status colorido.
    - [x] Atalhos rápidos para gestão de cardápio e pedidos.
- [x] **Páginas Públicas do Cardápio:**
    - [x] Listagem de categorias e produtos.
    - [x] Carrinho de compras (state management local).
    - [x] Checkout simplificado (Dados do cliente + Observação).
    - [x] Confirmação de pedido com número de rastreio.
- [x] Design System aplicado:
    - [x] Paleta de cores focada em apetite (Vermelho `red-600`, Laranja).
    - [x] Componentes de Cards, Botões e Inputs estilizados.
    - [x] UI Responsiva (Mobile-first com suporte a desktop).

---

## ⏳ Pendências Imediatas (A Fazer Agora/Em Breve)

### 1. Refinamento do Frontend Administrativo (Dashboard do Restaurante)
- [ ] **Gestão de Cardápio UI:**
    - [ ] Formulário de criação/edição de Categorias e Itens.
    - [ ] Upload de imagens (integração com storage local ou S3 simulado por enquanto).
    - [ ] Toggle de "Disponível/Indisponível" rápido.
- [ ] **Gestão de Pedidos (Kanban/Listagem):**
    - [ ] Tela para visualizar pedidos entrando em tempo real (polling ou websocket futuro).
    - [ ] Ação de mudar status do pedido (ex: Aceitar, Recusar, Marcar como Pronto).
    - [ ] Impressão de comanda (layout simples para impressão térmica).

### 2. Funcionalidades do Cliente Final
- [ ] **Página de Rastreio:** Página pública onde o cliente digita o número do pedido e vê o status atual.
- [ ] **Histórico de Pedidos:** (Opcional via cookie/localStorage) Para o cliente ver seus últimos pedidos na mesma sessão.

### 3. Backend & Segurança
- [ ] **Seeders:** Script para popular o banco com dados falsos (empresas, menus, pedidos) para testes rápidos.
- [ ] **Validações:** Refinar DTOs com `class-validator` para garantir integridade dos dados.
- [ ] **Tratamento de Erros:** Filtros globais de exceção para retornos amigáveis à API.
- [ ] **Integração Frontend-Backend:** Conectar formulários e ações dos dashboards às APIs reais.

---

## 🔮 Futuro do Projeto (Roadmap)

### Fase 2: Experiência do Usuário & Performance
- [ ] Implementar **WebSockets (Gateway)** para atualização em tempo real dos pedidos no dashboard (sem precisar dar F5).
- [ ] Otimização de imagens (next/image) e Lazy Loading.
- [ ] PWA (Progressive Web App): Permitir instalar o cardápio como app no celular.

### Fase 3: Gestão Avançada
- [ ] **Módulo de Mesas:** QR Code específico por mesa, pedido chega já vinculado à mesa X.
- [ ] **Cupons de Desconto:** Sistema básico de códigos promocionais por tenant.
- [ ] **Horários de Funcionamento:** Bloquear pedidos fora do horário configurado pelo restaurante.

### Fase 4: Infraestrutura & Escala
- [ ] Configurar **CI/CD** (GitHub Actions) para deploy automático na VPS ao fazer push na main.
- [ ] Configurar SSL Automático (Certbot/Let's Encrypt) no Nginx.
- [ ] Backup automático do banco de dados PostgreSQL.

---

## 💡 Ideias & Sugestões de Melhoria

1.  **Modo "Escuro" Automático:** Detectar preferência do sistema do usuário para o cardápio público.
2.  **Integração com WhatsApp:** Ao finalizar o pedido, enviar uma mensagem formatada para o WhatsApp do restaurante (solução low-code sem API paga).
3.  **Avaliação Pós-Pedido:** Após marcar como "Concluído", enviar link para o cliente avaliar (1-5 estrelas).
4.  **Combos:** Permitir criar itens que são junção de outros (ex: Burger + Batata + Refri) com preço promocional.
5.  **Adicionais/Opcionais:** Na hora de escolher o produto, permitir selecionar extras (ex: "Sem cebola", "Adicionar Bacon") com custo adicional.
6.  **Multi-idioma:** Estrutura pronta para i18n (Internacionalização) caso queira expandir para outros países.

---

## 📝 Notas Técnicas Importantes

- **Multi-Tenancy:** Atualmente implementado via `tenant_id` em todas as tabelas relevantes. O middleware extrai o tenant do token JWT ou da URL (subdomínio/slug).
- **Imagens:** Por enquanto, armazenamos URLs. Em produção na VPS, considerar montar um volume Docker para uploads locais ou configurar um bucket S3 (MinIO self-hosted é uma opção para manter tudo no mesmo servidor).
- **Banco de Dados:** PostgreSQL é a escolha padrão. Garantir que as migrations do TypeORM rodem automaticamente no startup do container.

---

*Última atualização: Após criação das telas de Login e Dashboards (Admin e Restaurante)*
*Responsável pela atualização: Desenvolvedor AI*
