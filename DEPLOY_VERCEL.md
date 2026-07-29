# 🚀 Deploy do CRM na Vercel

Um guia completo para hospedar seu CRM na Vercel gratuitamente!

## ✅ Pré-requisitos

- Conta GitHub (gratuita em https://github.com/signup)
- Conta Vercel (gratuita em https://vercel.com/signup)
- Git instalado na sua máquina

## 📋 Opção 1: Deploy via GitHub (RECOMENDADO)

### Passo 1: Inicializar Git no Projeto

```bash
git init
git add .
git commit -m "Initial commit: CRM básico"
```

### Passo 2: Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Crie um repositório chamado `crm-teste`
3. **NÃO** inicialize com README (já temos)
4. Clique em "Create repository"

### Passo 3: Fazer Push para GitHub

Copie os comandos que aparecem após criar o repositório. Será algo como:

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/crm-teste.git
git push -u origin main
```

### Passo 4: Conectar à Vercel

1. Acesse https://vercel.com/new
2. Clique em "Import Git Repository"
3. Conecte sua conta GitHub
4. Selecione o repositório `crm-teste`
5. Na configuração:
   - **Framework Preset**: Node.js
   - **Root Directory**: ./
   - **Build Command**: deixe em branco (ou `npm install`)
   - **Output Directory**: public
6. Clique em "Deploy"

✅ **Pronto!** Sua aplicação está no ar! A Vercel vai gerar uma URL como `https://crm-teste.vercel.app`

---

## 🖥️ Opção 2: Deploy via CLI

Se preferir fazer tudo pela linha de comando:

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Fazer Login

```bash
vercel login
```

Siga as instruções no navegador para autenticar.

### Passo 3: Deploy

```bash
vercel --prod
```

Responda as perguntas:
- **Project name**: crm-teste
- **Which directory**: ./
- **Detected Framework**: Node.js
- **Want to override settings**: No

✅ **Pronto!** Você receberá uma URL do seu CRM hospedado!

---

## ⚙️ Configurações Importantes

### Limitações na Vercel

- **Serverless Functions**: Requests têm limite de 60 segundos
- **Dados em Memória**: Serão perdidos a cada reinicialização
- **Armazenamento**: Não há armazenamento persistente no plano gratuito

### Para Produção Real

Para manter dados persistentes, adicione um banco de dados:

**Opção 1: MongoDB Atlas (Gratuito)**
```bash
npm install mongodb
```

Crie conta em https://www.mongodb.com/cloud/atlas

**Opção 2: PostgreSQL (PlanetScale - Gratuito)**
```bash
npm install @planetscale/database
```

Crie conta em https://planetscale.com

---

## 📊 Monitorar seu Deploy

Após o deploy:

1. Acesse https://vercel.com/dashboard
2. Clique no seu projeto `crm-teste`
3. Veja:
   - **Deployments**: histórico de versões
   - **Analytics**: uso e performance
   - **Logs**: erros e debug
   - **Settings**: configurações

---

## 🔄 Atualizar o CRM

Sempre que fizer mudanças:

```bash
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

A Vercel vai **fazer redeploy automaticamente**! 🚀

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Erro: "Build failed"
Verifique os logs na aba "Deployments" > clique no deploy com erro > "Logs"

### Aplicação muito lenta
A Vercel pode estar hibernando. Acesse a URL para acordar o servidor.

### Dados desaparecendo
É esperado! Adicione um banco de dados persistente (MongoDB, PostgreSQL, etc)

---

## 💡 Dicas Extras

### Domínio Customizado
1. Vá em Project Settings > Domains
2. Adicione seu domínio
3. Configure o DNS do seu registrador

### Variáveis de Ambiente
Se adicionar um banco de dados, crie arquivo `.env`:
```
DATABASE_URL=sua_url_aqui
```

Na Vercel: Settings > Environment Variables

### Preview URLs
Cada commit gera uma URL de preview automática para testar antes de deploy!

---

**Precisa de ajuda?**
- Docs Vercel: https://vercel.com/docs
- Discord Vercel: https://vercel.com/discord
- GitHub Discussions: https://github.com/orgs/vercel/discussions
