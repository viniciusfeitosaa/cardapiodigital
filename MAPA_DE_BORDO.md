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
- [x] **Layout Administrativo:** Sidebar, Header, estrutura de dashboard.
- [x] **Páginas Públicas do Cardápio:**
    - [x] Listagem de categorias e produtos.
    - [x] Carrinho de compras (state management local).
    - [x] Checkout simplificado (Dados do cliente + Observação).
    - [x] Confirmação de pedido com número de rastreio.
- [x] Design System aplicado:
    - [x] Paleta de cores focada em apetite (Vermelho `red-600`, Laranja).
    - [x] Componentes de Cards, Botões e Inputs estilizados.

### 4. Dashboards & Responsividade (Última Entrega)
- [x] **Dashboard do Restaurante Completo:**
    - [x] Visão geral com métricas (Pedidos hoje, Faturamento, Status).
    - [x] Cards de acesso rápido para Cardápio, Pedidos e Configurações.
    - [x] Lista de pedidos recentes com status colorido.
- [x] **Responsividade Total (Mobile-First):**
    - [x] Sidebar colapsável com menu hambúrguer em mobile.
    - [x] Grid de estatísticas adaptativo (1 coluna mobile, 2 tablet, 4 desktop).
    - [x] Tipografia responsiva (tamanhos ajustam por breakpoint).
    - [x] Layout flexível que evita overflow e deslocamentos.
    - [x] Header sticky para navegação fluida em telas pequenas.
    - [x] Overlay escuro ao abrir menu mobile.
- [x] **Commit e Push:** Código versionado e enviado para main no GitHub.

---

## ⏳ Pendências Imediatas (A Fazer Agora/Em Breve)

### 1. Refinamento do Frontend Administrativo (Dashboard do Restaurante)
- [ ] **Dashboard Home:** Gráficos simples (Pedidos hoje, Faturamento dia, Status dos pedidos).
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

*Última atualização: 2024 - Implementação completa dos dashboards Admin e Restaurante*
*Responsável pela atualização: Desenvolvedor AI*

---

## 📊 Resumo da Última Entrega

### Telas Implementadas (Frontend)

#### Painel Administrativo
✅ **Layout Administrativo** - Sidebar responsiva com navegação
✅ **Dashboard Home** - Visão geral com estatísticas
✅ **Gestão de Empresas** 
   - Tabela com listagem completa
   - Busca por nome/email
   - Badges de status e plano
   - Modal de criação/edição
   - Ações: visualizar, editar, excluir
   - Paginação

✅ **Gestão de Usuários**
   - Tabela com listagem completa
   - Busca por nome/email/empresa
   - Badges de função (Admin/Restaurante)
   - Modal de criação com senha
   - Ações completas de CRUD

#### Painel do Restaurante
✅ **Layout do Restaurante** - Sidebar com identidade visual laranja
✅ **Dashboard Home** - Métricas do negócio
✅ **Gestão de Cardápio**
   - Grid de categorias com cards coloridos
   - Stats: total categorias, itens, ticket médio
   - Modal de nova categoria (nome, descrição, cor)
   - Modal de novo item (nome, categoria, preço, descrição)
   - Toggle de disponibilidade
   - Busca e filtros

✅ **Gestão de Pedidos**
   - Lista completa de pedidos
   - Cards de status com cores semânticas
   - Filtros rápidos por status
   - Detalhes: cliente, itens, pagamento, tempo
   - Ações contextuais por status:
     * Pendente → "Preparar"
     * Preparando → "Marcar Pronto"
     * Pronto → "Entregar"
   - Contadores em tempo real

✅ **Configurações**
   - Sistema de abas navegáveis
   - **Geral:** Logo, nome, CNPJ, descrição
   - **Horário:** Funcionamento por dia da semana
   - **Entrega:** Raio, taxa, endereço completo
   - **Contato:** Telefone, WhatsApp, Email
   - **Pagamento:** Checkboxes para formas aceitas
   - Modal de upload de logo

### Princípios de IHC Aplicados
🎨 **Design Visual**
- Paleta de cores consistente (vermelho food delivery)
- Ícones Lucide intuitivos e semanticamente relevantes
- Hierarquia visual clara com tipografia escalada
- Espaçamento generoso para respirabilidade

🖱️ **Interação**
- Feedback visual em hover states
- Transições suaves (200-300ms)
- Estados ativos claramente diferenciados
- Cursor pointer em elementos clicáveis

📱 **Responsividade**
- Mobile-first approach
- Sidebar colapsável em mobile
- Tabelas com scroll horizontal
- Grids adaptativos (1-3 colunas)

♿ **Acessibilidade**
- Labels em todos os inputs
- Contraste de cores adequado
- Focus rings visíveis
- Textos descritivos em botões de ícone

### Commit & Push
✅ Código commitado e enviado para GitHub
✅ Branch main atualizada
✅ 7 novos arquivos frontend (1.438 linhas)
