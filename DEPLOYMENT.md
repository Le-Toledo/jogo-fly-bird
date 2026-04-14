# 🚀 Guia de Publicação no GitHub

Este arquivo contém instruções passo a passo para publicar seu projeto no GitHub.

## Pré-requisitos

- [Git](https://git-scm.com/download) instalado
- Conta no [GitHub](https://github.com) (gratuita)

## 1️⃣ Criar Repositório Remoto no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Preencha:
   - **Repository name:** `jogo-fly-bird`
   - **Description:** "Um jogo arcade em HTML5 inspirado em Flappy Bird"
   - **Public** (para que todos vejam)
   - Deixe as outras opções vazias (não faça inicialização)
3. Clique em **Create repository**

## 2️⃣ Adicionar Repositório Remoto

Após criar o repositório, você verá instruções. Execute no terminal (na pasta do projeto):

```bash
git remote add origin https://github.com/SEU-USUARIO/jogo-fly-bird.git
git branch -M main
git push -u origin main
```

**Substitua `SEU-USUARIO` por seu usuário do GitHub.**

## 3️⃣ Fazer Push do Código

O comando acima já enviará tudo. Confira em `https://github.com/SEU-USUARIO/jogo-fly-bird`

## 4️⃣ Habilitar GitHub Pages (Para Jogar Online)

1. Acesse seu repositório no GitHub
2. Vá para **Settings** (⚙️)
3. Procure por **Pages** no menu lateral esquerdo
4. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/ (root)`
5. Clique em **Save**

GitHub gerará um link como: `https://seu-usuario.github.io/jogo-fly-bird`

## 5️⃣ Esperar Alguns Minutos

O GitHub Pages leva alguns minutos para fazer build. Acesse o link acima em 2-3 minutos.

## 📝 Próximas Vezes (Após Mudanças)

Sempre que fizer mudanças locais:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

## 🆘 Troubleshooting

**Erro de autenticação (401):**
- Use HTTPS (não SSH) primeiro
- Ou [configure SSH keys](https://docs.github.com/pt/authentication/connecting-to-github-with-ssh)

**GitHub Pages não atualiza:**
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Espere 5-10 minutos
- Verifique se o branch `main` está selecionado em Settings > Pages

**Arquivo HTML não carrega CSS/JS:**
- Verifique se o arquivo é `index.html` (case-sensitive em alguns servidores)
- Verifique os caminhos dos arquivos

## 📚 Recursos

- [GitHub Docs: GitHub Pages](https://docs.github.com/pt/pages)
- [GitHub Docs: Push para um repositório remoto](https://docs.github.com/pt/get-started/using-git/pushing-commits-to-a-remote-repository)
- [Git Cheat Sheet](https://training.github.com)

## 🎉 Pronto!

Seu jogo está agora online e pode compartilhar o link com quem quiser! 🚀
