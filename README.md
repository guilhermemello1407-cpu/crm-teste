# CRM Básico - Sistema Fictício para Testes

Um sistema de gestão de relacionamento com clientes (CRM) básico e completo para fins de teste, desenvolvido com Node.js, Express e vanilla JavaScript.

## 📋 Funcionalidades

- **Gestão de Clientes**
  - Listar todos os clientes cadastrados
  - Adicionar novo cliente (nome, email, telefone, empresa)
  - Editar informações do cliente
  - Deletar cliente
  - Atualizar status do cliente (Ativo, Inativo, Potencial)

- **Interações com Clientes**
  - Registrar interações (Email, Chamada, Reunião, Mensagem)
  - Visualizar histórico de interações por cliente
  - Listar todas as interações registradas

## 🚀 Como Usar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Iniciar o Servidor

```bash
npm start
```

O servidor rodará em `http://localhost:3000`

### 3. Acessar a Aplicação

Abra seu navegador e acesse:
```
http://localhost:3000
```

## 📊 Dados Fictícios Iniciais

O sistema vem com 3 clientes pré-cadastrados:

1. **João Silva** - Tech Corp
2. **Maria Santos** - Design LLC
3. **Pedro Oliveira** - Solutions Inc

E algumas interações de exemplo.

## 🏗️ Estrutura do Projeto

```
crm-teste/
├── server.js           # Backend Express
├── package.json        # Dependências
├── README.md          # Esta documentação
└── public/
    ├── index.html     # Interface HTML
    ├── style.css      # Estilos
    └── script.js      # Lógica JavaScript
```

## 🔌 Endpoints da API

### Clientes
- `GET /api/clientes` - Lista todos os clientes
- `POST /api/clientes` - Cria novo cliente
- `PUT /api/clientes/:id` - Atualiza cliente
- `DELETE /api/clientes/:id` - Deleta cliente

### Interações
- `GET /api/interacoes/:clienteId` - Lista interações de um cliente
- `POST /api/interacoes` - Cria nova interação

## 💾 Dados em Memória

⚠️ **Nota importante**: Os dados são armazenados em memória e serão perdidos ao reiniciar o servidor. Para um ambiente de produção, seria necessário implementar um banco de dados persistente.

## 🎨 Tecnologias Utilizadas

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + CSS3 + JavaScript Vanilla
- **Design**: Interface responsiva com gradientes modernos

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona bem em:
- Desktop
- Tablets
- Dispositivos móveis

## 🧪 Exemplos de Uso

### Adicionar um Cliente
1. Vá para a aba "Clientes"
2. Preencha o formulário com os dados
3. Clique em "Adicionar Cliente"

### Registrar uma Interação
1. Vá para a aba "Interações"
2. Selecione um cliente
3. Escolha o tipo de interação
4. Descreva a interação
5. Clique em "Registrar Interação"

### Editar Cliente
1. Na aba "Clientes", clique em "✏️ Editar" no cartão do cliente
2. Modifique as informações
3. Clique em "Salvar Alterações"

## 📝 Notas para Testes

- Todos os campos de entrada têm validação no formulário HTML
- As operações são confirmadas em tempo real na interface
- O histórico de interações mostra o cliente responsável e a data
- Deletar um cliente também remove todas suas interações

---

**Desenvolvido para testes e estudo** 🎓
