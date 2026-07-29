const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const Usuario = require('./models/Usuario');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crm-teste', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Conectado ao MongoDB');
}).catch(err => {
  console.error('❌ Erro ao conectar ao MongoDB:', err.message);
  console.log('⚠️  Rodando sem banco de dados (dados em memória)');
});

// Middleware de autenticação
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ erro: 'Token inválido' });
  }
};

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

// ===== ROTAS DE AUTENTICAÇÃO =====
// Registro
app.post('/api/auth/registrar', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
    }

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    const usuario = new Usuario({ nome, email, senha });
    await usuario.save();

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ mensagem: 'Usuário cadastrado com sucesso!', token, usuario: { id: usuario._id, nome, email } });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ erro: 'Email ou senha incorretos' });
    }

    const senhaValida = await usuario.compararSenha(senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Email ou senha incorretos' });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ mensagem: 'Login realizado!', token, usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email } });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// ===== ROTAS - CLIENTES (Protegidas) =====
app.get('/api/clientes', verificarToken, (req, res) => {
  res.json(clientes);
});

app.post('/api/clientes', verificarToken, (req, res) => {
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

app.put('/api/clientes/:id', verificarToken, (req, res) => {
  const cliente = clientes.find(c => c.id == req.params.id);
  if (cliente) {
    Object.assign(cliente, req.body);
    res.json(cliente);
  } else {
    res.status(404).json({ erro: 'Cliente não encontrado' });
  }
});

app.delete('/api/clientes/:id', verificarToken, (req, res) => {
  clientes = clientes.filter(c => c.id != req.params.id);
  interacoes = interacoes.filter(i => i.clienteId != req.params.id);
  res.json({ sucesso: true });
});

// ===== ROTAS - INTERAÇÕES (Protegidas) =====
app.get('/api/interacoes', verificarToken, (req, res) => {
  res.json(interacoes);
});

app.get('/api/interacoes/:clienteId', verificarToken, (req, res) => {
  const clienteInteracoes = interacoes.filter(i => i.clienteId == req.params.clienteId);
  res.json(clienteInteracoes);
});

app.post('/api/interacoes', verificarToken, (req, res) => {
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
  console.log(`🚀 CRM rodando em http://localhost:${PORT}`);
});
