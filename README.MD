## Trabalho Desafio Sequelize##

# Dupla: Ana jeize e Juliana

# API REST - Sistema de Gestão (Usuários, Produtos e Pedidos)

API RESTful completa desenvolvida com Node.js, Express e MySQL para gerenciar usuários, produtos e pedidos com relacionamentos entre entidades.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** (v5.2.1) - Framework web para Node.js
- **MySQL** (v8.0) - Banco de dados relacional
- **Sequelize** (v6.37.8) - ORM para Node.js
- **Docker** - Contêinerização do MySQL
- **dotenv** - Gerenciamento de variáveis de ambiente
- **Nodemon** - Hot reload durante desenvolvimento

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [Docker](https://www.docker.com/)
- [Postman](https://www.postman.com/) (para testar a API)

---

## Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd projeto-marcio
```

### 2. Instale as dependências

```bash
cd desafio
npm install
```

### 3. Configure o Docker com MySQL

Execute o comando para criar o container MySQL:

```bash
docker run --name  -e MYSQL_ROOT_PASSWORD=***** -e MYSQL_DATABASE=desafio_sequelize -p 3307:3306 -d mysql:8.0
```

**Detalhes do Container:**

- **Imagem:** mysql:8.0
- **Nome:** mysql-desafio
- **Porta Externa:** 3307
- **Porta Interna:** 3306
- **Usuário:** root
- **Senha:** **\*\*\***
- **Database:** desafio_sequelize

### 4. Inicie o container (se parado)

```bash
docker start mysql-desafio
```

### 5. Verifique se o container está rodando

```bash
docker ps
```

---

## Configuração

### Arquivo `.env`

Crie um arquivo `.env` dentro da pasta `desafio/src/`:

```env
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=*****8
DB_NAME=desafio_sequelize
DB_DIALECT=mysql
```

---

## Executando o Projeto

### Modo desenvolvimento (com nodemon)

```bash
cd nome da pasta
npm start
```

O servidor estará rodando em: **http://localhost:3000**

### Verificar logs

```
Servidor rodando na porta 3000
Conexão com MySQL estabelecida com sucesso!
```

---

## Estrutura do Projeto

```
projeto-marcio/
├── desafio/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js         # Configuração do Sequelize
│   │   ├── models/
│   │   │   ├── Usuarios.js         # Model de Usuários
│   │   │   ├── Produto.js          # Model de Produtos
│   │   │   └── Pedido.js           # Model de Pedidos
│   │   ├── controllers/
│   │   │   ├── UsuarioController.js    # Lógica CRUD Usuários
│   │   │   ├── ProdutoController.js    # Lógica CRUD Produtos
│   │   │   └── PedidoController.js     # Lógica CRUD Pedidos
│   │   ├── routes/
│   │   │   ├── usuarioRoutes.js    # Rotas de Usuários
│   │   │   ├── ProdutoRoutes.js    # Rotas de Produtos
│   │   │   └── PedidoRoutes.js     # Rotas de Pedidos
│   │   ├── .env                    # Variáveis de ambiente
│   │   └── app.js                  # Arquivo principal
│   └── package.json
└── README.MD
```

### Arquivo `database.js` - Conexão com MySQL

```javascript
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false, // Desabilita logs SQL
  },
);

module.exports = sequelize;
```

**Responsabilidades:**

- Centralizar configuração do banco
- Criar conexão com MySQL usando Sequelize ORM
- Carregar credenciais do arquivo `.env`

---

## Modelos de Dados

### Usuário (Usuario)

```javascript
{
  id: INTEGER (PK, Auto Increment),
  nome: STRING (Not Null),
  email: STRING (Unique, Not Null),
  senha: STRING (Not Null),
  createdAt: DATE,
  updatedAt: DATE
}
```

### Produto (Produto)

```javascript
{
  id: INTEGER (PK, Auto Increment),
  nome: STRING (Not Null),
  preco: FLOAT (Not Null),
  estoque: INTEGER (Default: 0),
  createdAt: DATE,
  updatedAt: DATE
}
```

### Pedido (Pedido)

```javascript
{
  id: INTEGER (PK, Auto Increment),
  usuarioId: INTEGER (FK -> Usuarios.id),
  produtoId: INTEGER (FK -> Produtos.id),
  quantidade: INTEGER (Not Null),
  createdAt: DATE,
  updatedAt: DATE
}
```

**Relacionamentos:**

- Um **Pedido** pertence a um **Usuário** (belongsTo)
- Um **Pedido** pertence a um **Produto** (belongsTo)
- Ao criar um pedido, o **estoque do produto é reduzido automaticamente**

---

## Endpoints da API

### **CRUD de Usuários**

| Método | Endpoint            | Descrição                |
| ------ | ------------------- | ------------------------ |
| POST   | `/api/usuarios`     | Criar novo usuário       |
| GET    | `/api/usuarios`     | Listar todos os usuários |
| GET    | `/api/usuarios/:id` | Buscar usuário por ID    |
| PUT    | `/api/usuarios/:id` | Atualizar usuário        |
| DELETE | `/api/usuarios/:id` | Deletar usuário          |

---

### **CRUD de Produtos**

| Método | Endpoint            | Descrição                |
| ------ | ------------------- | ------------------------ |
| POST   | `/api/produtos`     | Criar novo produto       |
| GET    | `/api/produtos`     | Listar todos os produtos |
| GET    | `/api/produtos/:id` | Buscar produto por ID    |
| PUT    | `/api/produtos/:id` | Atualizar produto        |
| DELETE | `/api/produtos/:id` | Deletar produto          |

---

### **CRUD de Pedidos**

| Método | Endpoint           | Descrição               |
| ------ | ------------------ | ----------------------- |
| POST   | `/api/pedidos`     | Criar novo pedido       |
| GET    | `/api/pedidos`     | Listar todos os pedidos |
| GET    | `/api/pedidos/:id` | Buscar pedido por ID    |
| PUT    | `/api/pedidos/:id` | Atualizar pedido        |
| DELETE | `/api/pedidos/:id` | Deletar pedido          |

**Importante:** Para criar um pedido, você precisa:

- Ter pelo menos 1 **usuário** criado (anote o ID)
- Ter pelo menos 1 **produto** criado com estoque disponível (anote o ID)

---

## Testando com Postman

### 1 **Criar Usuário**

- **Método:** POST
- **URL:** `http://localhost:3000/api/usuarios`
- **Body (JSON):**

```json
{
  "nome": "Ana Exemplo",
  "email": "ana@email.com",
  "senha": "123456"
}
```

**Resposta:**

```json
{
  "id": 1,
  "nome": "Ana Exemplo",
  "email": "ana@email.com",
  "senha": "123456",
  "updatedAt": "2026-04-23T00:00:00.000Z",
  "createdAt": "2026-04-23T00:00:00.000Z"
}
```

---

### **Listar Todos os Usuários**

- **Método:** GET
- **URL:** `http://localhost:3000/api/usuarios`
- **Body:** Nenhum

---

### **Buscar Usuário por ID**

- **Método:** GET
- **URL:** `http://localhost:3000/api/usuarios/1`
- **Body:** Nenhum

---

### **Atualizar Usuário**

- **Método:** PUT
- **URL:** `http://localhost:3000/api/usuarios/1`
- **Body (JSON):**

```json
{
  "nome": "Ana Silva Atualizada",
  "email": "ana.nova@email.com"
}
```

---

### **Deletar Usuário**

- **Método:** DELETE
- **URL:** `http://localhost:3000/api/usuarios/1`
- **Body:** Nenhum

---

### **Criar Produto**

- **Método:** POST
- **URL:** `http://localhost:3000/api/produtos`
- **Body (JSON):**

```json
{
  "nome": "Notebook Dell",
  "preco": 3500.5,
  "estoque": 10
}
```

---

### **Listar Todos os Produtos**

- **Método:** GET
- **URL:** `http://localhost:3000/api/produtos`
- **Body:** Nenhum

---

### **Buscar Produto por ID**

- **Método:** GET
- **URL:** `http://localhost:3000/api/produtos/1`
- **Body:** Nenhum

---

### **Atualizar Produto**

- **Método:** PUT
- **URL:** `http://localhost:3000/api/produtos/1`
- **Body (JSON):**

```json
{
  "nome": "Notebook Dell Inspiron",
  "preco": 3200.0,
  "estoque": 15
}
```

---

### **Deletar Produto**

- **Método:** DELETE
- **URL:** `http://localhost:3000/api/produtos/1`
- **Body:** Nenhum

---

### **Criar Pedido**

- **Método:** POST
- **URL:** `http://localhost:3000/api/pedidos`
- **Body (JSON):**

```json
{
  "usuarioId": 1,
  "produtoId": 1,
  "quantidade": 2
}
```

**O que acontece:**

- Valida se o usuário existe
- Valida se o produto existe
- Verifica se há estoque suficiente
- Cria o pedido
- **Reduz automaticamente o estoque do produto**

---

### **Listar Todos os Pedidos**

- **Método:** GET
- **URL:** `http://localhost:3000/api/pedidos`
- **Body:** Nenhum

---

### **Buscar Pedido por ID**

- **Método:** GET
- **URL:** `http://localhost:3000/api/pedidos/1`
- **Body:** Nenhum

---

### **Atualizar Pedido**

- **Método:** PUT
- **URL:** `http://localhost:3000/api/pedidos/1`
- **Body (JSON):**

```json
{
  "quantidade": 5
}
```

---

### **Deletar Pedido**

- **Método:** DELETE
- **URL:** `http://localhost:3000/api/pedidos/1`
- **Body:** Nenhum

---

## Workflow Git/GitHub

### **Estratégia de Branches**

O projeto utiliza uma estratégia de branches para organizar o desenvolvimento:

```
main (produção)
├── feature/produtos (CRUD de Produtos)
├── feature/pedidos (CRUD de Pedidos)
└── atualizacoes (Documentação e melhorias)
```

---

### **Criando e Trabalhando com Branches**

#### **1. Criar uma Nova Branch**

```bash
# Criar e mudar para a nova branch
git checkout -b nome-da-branch

# Exemplos usados neste projeto:
git checkout -b feature/produtos
git checkout -b feature/pedidos
git checkout -b atualizacoes
```

---

#### **2. Verificar Branch Atual**

```bash
git branch
```

> O `*` indica a branch ativa

---

#### **3. Adicionar Arquivos Específicos**

```bash
# Branch de Produtos
git add src/controllers/ProdutoController.js
git add src/models/Produto.js
git add src/routes/ProdutoRoutes.js

# Branch de Pedidos
git add src/controllers/PedidoController.js
git add src/models/Pedido.js
git add src/routes/PedidoRoutes.js

# Ou adicionar múltiplos arquivos de uma vez
git add src/controllers/ProdutoController.js src/models/Produto.js src/routes/ProdutoRoutes.js
```

---

#### **4. Adicionar Todos os Arquivos Modificados**

```bash
git add .
```

---

#### **5. Verificar Status dos Arquivos**

```bash
git status
```

- **Vermelho:** Arquivos modificados mas não adicionados
- **Verde:** Arquivos prontos para commit (staged)

---

#### **6. Fazer Commit**

```bash
# Produtos
git commit -m "feat: implementa CRUD completo de produtos"

# Pedidos
git commit -m "feat: implementa CRUD completo de pedidos com gestão de estoque"

# Documentação
git commit -m "docs: atualiza README com documentação completa"
```

**Convenção de Commits:**

- `feat:` - Nova funcionalidade
- `docs:` - Documentação

---

#### **7. Enviar Branch para o GitHub**

```bash
git push origin nome-da-branch

# Exemplos:
git push origin feature/produtos
git push origin feature/pedidos
git push origin atualizacoes
```

## Desenvolvimento

Projeto desenvolvido como desafio de implementação de API REST com:

- 3 CRUDs completos (Usuários, Produtos, Pedidos)
- Relacionamentos entre entidades
- Gestão automática de estoque
- Validações de integridade referencial

---

# Estrutura do Projeto

## Models (src/models/Usuarios.js)

- Define a estrutura da tabela Usuario no banco de dados
- Campos: id (PK, autoincrement), nome (string), email (string, unique), senha (string)
- Usa Sequelize para mapear objeto JavaScript para tabela MySQL

## Controllers (src/controllers/UsuarioControlller.js)

- criarUsuario - Cria novo usuário no banco (POST)
- listarUsuarios - Lista todos os usuários (GET)
- buscarUsuarioPorId - Busca usuário específico por ID (GET)

## Routes (src/routes/usuarioRoutes.js)

- POST /api/usuarios - Criar usuário
- GET /api/usuarios - Listar todos
- GET /api/usuarios/:id - Buscar por ID

## Servidor (src/app.js)

- Carrega variáveis de ambiente (.env)
- Configura Express e middleware JSON
- Registra rotas de usuário
- Sincroniza banco de dados com Sequelize
- Inicia servidor na porta 3000

# Testando no Postman

## 1. Criar Usuário (POST)

- URL: http://localhost:3000/api/usuarios
- Method: POST
- Body (raw JSON):
  {
  "nome": "Ana Julia",
  "email": "ana@email.com",
  "senha": "......"
  }

## 2. Listar Todos os Usuários (GET)

- URL: http://localhost:3000/api/usuarios
- Method: GET

## 3. Buscar Usuário por ID (GET)

- URL: http://localhost:3000/api/usuarios/1
- Method: GET

# Comandos para iniciar o projeto

- npm start - Inicia servidor em modo produção
- npm run dev - Inicia servidor com nodemon (modo desenvolvimento)
