// ===== Estado Global =====
let clientes = [];
let interacoes = [];

// ===== Elementos do DOM =====
const formCliente = document.getElementById('formCliente');
const listaClientes = document.getElementById('listaClientes');
const formInteracao = document.getElementById('formInteracao');
const listaInteracoes = document.getElementById('listaInteracoes');
const clienteSelect = document.getElementById('clienteSelect');
const modal = document.getElementById('modalEditar');
const closeBtn = document.querySelector('.close');
const formEditar = document.getElementById('formEditar');

// ===== Tabs =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ===== Modal =====
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

// ===== Carregamento Inicial =====
async function carregarClientes() {
  try {
    const response = await fetch('/api/clientes');
    clientes = await response.json();
    renderizarClientes();
    atualizarSelectClientes();
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
  }
}

async function carregarInteracoes() {
  try {
    const response = await fetch('/api/interacoes');
    interacoes = await response.json();
    renderizarInteracoes();
  } catch (error) {
    console.error('Erro ao carregar interações:', error);
  }
}

// ===== Adicionar Cliente =====
formCliente.addEventListener('submit', async (e) => {
  e.preventDefault();

  const novoCliente = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value,
    empresa: document.getElementById('empresa').value
  };

  try {
    const response = await fetch('/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoCliente)
    });

    if (response.ok) {
      formCliente.reset();
      carregarClientes();
    }
  } catch (error) {
    console.error('Erro ao adicionar cliente:', error);
  }
});

// ===== Renderizar Clientes =====
function renderizarClientes() {
  if (clientes.length === 0) {
    listaClientes.innerHTML = '<div class="empty-state"><p>Nenhum cliente cadastrado ainda</p></div>';
    return;
  }

  listaClientes.innerHTML = clientes.map(cliente => `
    <div class="client-card">
      <div class="client-header">
        <div class="client-name">${cliente.nome}</div>
        <div class="client-status status-${cliente.status.toLowerCase()}">${cliente.status}</div>
      </div>

      <div class="client-info">
        <strong>Email:</strong>
        <a href="mailto:${cliente.email}" style="color: #667eea; text-decoration: none;">${cliente.email}</a>
      </div>

      ${cliente.telefone ? `
      <div class="client-info">
        <strong>Telefone:</strong>
        <a href="tel:${cliente.telefone}" style="color: #667eea; text-decoration: none;">${cliente.telefone}</a>
      </div>
      ` : ''}

      ${cliente.empresa ? `
      <div class="client-info">
        <strong>Empresa:</strong>
        ${cliente.empresa}
      </div>
      ` : ''}

      <div class="client-actions">
        <button class="btn-small btn-interactions" onclick="mostrarInteracoesCliente(${cliente.id})">
          📝 Interações
        </button>
        <button class="btn-small btn-edit" onclick="abrirModalEditar(${cliente.id})">
          ✏️ Editar
        </button>
        <button class="btn-small btn-delete" onclick="deletarCliente(${cliente.id})">
          🗑️ Deletar
        </button>
      </div>
    </div>
  `).join('');
}

// ===== Editar Cliente =====
function abrirModalEditar(id) {
  const cliente = clientes.find(c => c.id === id);
  if (!cliente) return;

  document.getElementById('editarId').value = cliente.id;
  document.getElementById('editarNome').value = cliente.nome;
  document.getElementById('editarEmail').value = cliente.email;
  document.getElementById('editarTelefone').value = cliente.telefone;
  document.getElementById('editarEmpresa').value = cliente.empresa;
  document.getElementById('editarStatus').value = cliente.status;

  modal.classList.remove('hidden');
}

formEditar.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('editarId').value;
  const clienteAtualizado = {
    nome: document.getElementById('editarNome').value,
    email: document.getElementById('editarEmail').value,
    telefone: document.getElementById('editarTelefone').value,
    empresa: document.getElementById('editarEmpresa').value,
    status: document.getElementById('editarStatus').value
  };

  try {
    const response = await fetch(`/api/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clienteAtualizado)
    });

    if (response.ok) {
      modal.classList.add('hidden');
      carregarClientes();
    }
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
  }
});

// ===== Deletar Cliente =====
async function deletarCliente(id) {
  if (!confirm('Tem certeza que deseja deletar este cliente?')) return;

  try {
    const response = await fetch(`/api/clientes/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      carregarClientes();
      carregarInteracoes();
    }
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
  }
}

// ===== Atualizar Select de Clientes =====
function atualizarSelectClientes() {
  const opcoesClientes = clientes.map(c =>
    `<option value="${c.id}">${c.nome} (${c.empresa})</option>`
  ).join('');

  clienteSelect.innerHTML = '<option value="">Selecione um cliente...</option>' + opcoesClientes;
}

// ===== Adicionar Interação =====
formInteracao.addEventListener('submit', async (e) => {
  e.preventDefault();

  const novaInteracao = {
    clienteId: parseInt(document.getElementById('clienteSelect').value),
    tipo: document.getElementById('tipoInteracao').value,
    descricao: document.getElementById('descricaoInteracao').value
  };

  try {
    const response = await fetch('/api/interacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaInteracao)
    });

    if (response.ok) {
      formInteracao.reset();
      carregarInteracoes();
    }
  } catch (error) {
    console.error('Erro ao adicionar interação:', error);
  }
});

// ===== Renderizar Interações =====
function renderizarInteracoes() {
  if (interacoes.length === 0) {
    listaInteracoes.innerHTML = '<div class="empty-state"><p>Nenhuma interação registrada</p></div>';
    return;
  }

  listaInteracoes.innerHTML = interacoes.map(interacao => {
    const cliente = clientes.find(c => c.id === interacao.clienteId);
    return `
      <div class="interaction-item">
        <div class="interaction-header">
          <div>
            <div class="interaction-client">${cliente ? cliente.nome : 'Cliente desconhecido'}</div>
            <span class="interaction-type">${interacao.tipo}</span>
          </div>
          <div class="interaction-date">${formatarData(interacao.data)}</div>
        </div>
        <div class="interaction-description">${interacao.descricao}</div>
      </div>
    `;
  }).join('');
}

// ===== Mostrar Interações do Cliente =====
async function mostrarInteracoesCliente(clienteId) {
  try {
    const response = await fetch(`/api/interacoes/${clienteId}`);
    const clienteInteracoes = await response.json();

    const cliente = clientes.find(c => c.id === clienteId);

    let html = `<div class="empty-state"><p>Nenhuma interação para este cliente</p></div>`;

    if (clienteInteracoes.length > 0) {
      html = clienteInteracoes.map(interacao => `
        <div class="interaction-item">
          <div class="interaction-header">
            <span class="interaction-type">${interacao.tipo}</span>
            <div class="interaction-date">${formatarData(interacao.data)}</div>
          </div>
          <div class="interaction-description">${interacao.descricao}</div>
        </div>
      `).join('');
    }

    // Simular um alerta com as interações
    alert(`Interações de ${cliente.nome}:\n\n${clienteInteracoes.map(i => `[${i.tipo}] ${i.descricao} (${i.data})`).join('\n')}`);
  } catch (error) {
    console.error('Erro ao carregar interações:', error);
  }
}

// ===== Utilitários =====
function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR');
}

// ===== Inicializar =====
document.addEventListener('DOMContentLoaded', () => {
  carregarClientes();
  carregarInteracoes();
});
