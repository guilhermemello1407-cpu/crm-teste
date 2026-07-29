const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

// Criptografar senha antes de salvar
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) {
    return next();
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    this.senha = await bcryptjs.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senhas
usuarioSchema.methods.compararSenha = async function(senhaInformada) {
  return await bcryptjs.compare(senhaInformada, this.senha);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
