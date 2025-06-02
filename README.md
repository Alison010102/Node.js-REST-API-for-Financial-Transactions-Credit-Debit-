# Node.js REST API for Financial Transactions (Credit/Debit)

Uma API RESTful simples e eficiente desenvolvida com **Node.js** usando **TypeScript** para gerenciar transações financeiras de crédito e débito. Utiliza **SQLite** para persistência de dados e gerencia sessões com cookies.

---

## 📌 Funcionalidades

- ✅ Criar transações (crédito ou débito)  
- 📋 Listar todas as transações da sessão atual  
- 🔍 Buscar uma transação específica por ID  
- 📊 Obter resumo do saldo (soma das transações)  
- 🍪 Gerenciamento de sessão com cookies  
- 🔄 Migrations para controle do banco de dados  
- 🧪 Testes end-to-end com Vitest e Supertest  

---

## 🛠️ Tecnologias Utilizadas

- Node.js  
- Fastify  
- TypeScript  
- Knex  
- SQLite  
- Zod  
- Vitest  
- Supertest  

---

## 🚀 Como Executar o Projeto

```bash
# Instale as dependências
npm install

# Crie o arquivo .env com as variáveis de ambiente
echo "DATABASE_URL=./db/app.db\nNODE_ENV=development" > .env

# Rode as migrations do banco de dados
npm run knex migrate:latest

# Inicie o servidor em modo de desenvolvimento
npm run dev
