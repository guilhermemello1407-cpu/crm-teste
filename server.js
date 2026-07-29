const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

let clientes = [
  { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '11999999999', empresa: 'Tech Corp', status: 'Ativo' },
  { id: 2, nome: 'Maria Santos', email: 'maria@email.com', telefone: '11988888888', empresa: 'Design LLC', status: 'Ativo' },
  { id: 3, nome: 'Pedro Oliveira', email: 'pedro@email.com', telefone: '11977777777', empresa: 'Solutions Inc', status: 'Inativo' }
];

let interacoes = [
  { id: 1, clienteId: 1, tipo: 'Email', descricao: 'Primeira reunião marcada', data: '2026-07-28' },
  { id: 2, clienteId: 1, tipo: 'Chamada', descricao: 'Apresentação do produto', data: '2026-07-27' },
  { id: 3, clienteId: 2, tipo: 'Email', descricao: 'Proposta enviada', data: '2026-07-26' }
];

let proximoIdCliente = 4;
let proximoIdInteracao = 4;

// Rotas - Clientes
app.get('/api/clientes', (req, res) => {
  res.json(clientes);
});

app.post('/api/clientes', (req, res) => {
  const novoCliente = {
    id: proximoIdCliente++,
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    empresa: req.body.empresa,
    status: 'Ativo'
  };
  clientes.push(novoCliente);
  res.json(novoCliente);
});

app.put('/api/clientes/:id', (req, res) => {
  const cliente = clientes.find(c => c.id == req.params.id);
  if (cliente) {
    Object.assign(cliente, req.body);
    res.json(cliente);
  } else {
    res.status(404).json({ erro: 'Cliente não encontrado' });
  }
});

app.delete('/api/clientes/:id', (req, res) => {
  clientes = clientes.filter(c => c.id != req.params.id);
  interacoes = interacoes.filter(i => i.clienteId != req.params.id);
  res.json({ sucesso: true });
});

// Rotas - Interações
app.get('/api/interacoes', (req, res) => {
  res.json(interacoes);
});

app.get('/api/interacoes/:clienteId', (req, res) => {
  const clienteInteracoes = interacoes.filter(i => i.clienteId == req.params.clienteId);
  res.json(clienteInteracoes);
});

app.post('/api/interacoes', (req, res) => {
  const novaInteracao = {
    id: proximoIdInteracao++,
    clienteId: req.body.clienteId,
    tipo: req.body.tipo,
    descricao: req.body.descricao,
    data: new Date().toISOString().split('T')[0]
  };
  interacoes.push(novaInteracao);
  res.json(novaInteracao);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CRM rodando em http://localhost:${PORT}`);
});
