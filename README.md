# Sistema de Gerenciamento Acadêmico 

Uma aplicação web completa para o gerenciamento de alunos, disciplinas e alocações acadêmicas. O sistema possui controle de acesso baseado em funções (Administrador e Aluno), garantindo a segurança e integridade dos dados.

---

## Tecnologias Utilizadas

### Frontend

* **React (Vite):** Estrutura principal da interface.
* **Formik & Yup:** Gerenciamento e validação avançada de formulários.
* **React-Toastify:** Notificações amigáveis de sucesso e erro na tela.
* **Axios:** Comunicação com a API do backend através de interceptores globais.

### Backend

* **Node.js & Express:** Construção da API RESTful.
* **MongoDB & Mongoose:** Banco de dados NoSQL e modelagem de dados.
* **JWT (JSON Web Tokens):** Autenticação segura de usuários.
* **Bcryptjs:** Criptografia de senhas no banco de dados.

---

## Funcionalidades Principais

* **Controle de Acesso (RBAC):** * **Painel do Administrador:** CRUD completo de Alunos, CRUD de Disciplinas e gerenciamento de matrículas.
* **Painel do Aluno:** Visualização de dados cadastrais e consulta de disciplinas em que está alocado.


* **Segurança Avançada:** * Senhas criptografadas automaticamente via middlewares do Mongoose antes de irem para o banco.
* Tratamento global de sessões expiradas (Token JWT) via interceptores do Axios, evitando mensagens duplicadas e protegendo as rotas.


* **Integridade de Dados:** Remoção em cascata (se um aluno ou disciplina for deletado, suas alocações e usuários de login também são apagados).

---

## Estrutura do Projeto

```text
### Backend
├── backend/
│   ├── config/             # Configurações gerais (ex: conexão com o banco)
│   ├── controllers/        # Regras de negócio e processamento da API
│   ├── middleware/         # Proteção de rotas (JWT) e controle de permissões
│   ├── models/             # Esquemas do banco de dados (Mongoose)
│   ├── routes/             # Definição dos endpoints (URLs) da API
│   ├── .env                # Variáveis de ambiente (credenciais)
│   └── server.js           # Arquivo principal que inicializa o servidor
│
### Frontend
├── frontend/
│   ├── public/             # Arquivos públicos estáticos
│   ├── src/
│   │   ├── components/     # Componentes da interface divididos por módulos
│   │   ├── services/       # Lógica de integração externa e chamadas à API
│   │   ├── api.js          # Configuração global do Axios e tratamento de erros
│   │   ├── App.jsx         # Ponto central de roteamento e estado global
│   │   └── main.jsx        # Ponto de entrada do React
│   └── vite.config.js      # Configurações do empacotador
```
---

## Como Executar o Projeto

### Pré-requisitos

* [Node.js](https://nodejs.org/) instalado.
* [MongoDB](https://www.mongodb.com/) rodando localmente ou uma URI do MongoDB Atlas.

### 1. Configurando o Backend

1. Entre na pasta do backend:
```bash
cd backend

```


2. Instale as dependências:
```bash
npm install

```


3. Crie um arquivo `.env` na raiz da pasta `backend` e adicione as seguintes variáveis:
```env
MONGO_URI=sua_uri_do_mongodb
JWT_SECRET=sua_chave_secreta_aqui
PORT=5000

```


4. Inicie o servidor:
```bash
npm run dev

```



### 2. Configurando o Frontend

1. Abra um novo terminal e entre na pasta do frontend:
```bash
cd frontend

```


2. Instale as dependências:
```bash
npm install

```


3. Inicie a aplicação:
```bash
npm run dev

```


4. Acesse o endereço indicado no terminal (geralmente `http://localhost:5173`).

---
