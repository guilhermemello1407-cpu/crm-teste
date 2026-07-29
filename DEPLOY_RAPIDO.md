# 🚀 Deploy Rápido na Vercel (5 minutos)

## ⚡ Resumo em 5 Passos

### 1️⃣ Criar conta GitHub
- https://github.com/signup (se não tiver)
- Lembre da sua senha!

### 2️⃣ Criar repositório no GitHub
```
https://github.com/new
- Nome: crm-teste
- Crie o repositório
```

### 3️⃣ Fazer Push do Código

Abra o PowerShell na pasta `crm-teste` e execute:

```powershell
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/crm-teste.git
git push -u origin main
```

**Substitua `SEU_USUARIO` pelo seu usuário GitHub!**

### 4️⃣ Conectar à Vercel
- Acesse https://vercel.com/signup (crie conta)
- Clique em "Import Git Repository"
- Conecte seu GitHub
- Selecione `crm-teste`
- Clique em "Deploy"

### 5️⃣ Pronto! 🎉
A Vercel vai gerar uma URL automática para seu CRM!

---

## 📝 Exemplo Prático

Se seu usuário GitHub é `joao123`:

```powershell
git branch -M main
git remote add origin https://github.com/joao123/crm-teste.git
git push -u origin main
```

Depois acesse https://vercel.com e importe!

---

## ❓ Dúvidas Comuns

**P: Preciso pagar?**
R: Não! Vercel é gratuito para projetos pessoais.

**P: Os dados persistem?**
R: Não, são zerados a cada reinicialização. Para dados persistentes, use MongoDB Atlas.

**P: Como faço atualizações?**
R: Faça `git push` e Vercel faz redeploy automaticamente!

**P: Como adiciono domínio próprio?**
R: Em Project Settings > Domains na Vercel.

---

## 🔗 Links Úteis

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub**: https://github.com
- **Documentação Completa**: Ver arquivo `DEPLOY_VERCEL.md`

---

**Pronto? Boa sorte! 🚀**
