# 🎮 Sky Bird

> Um jogo arcade em HTML5 inspirado em Flappy Bird. Rápido, leve e pronto para publicar.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🎯 Sobre o Projeto

Sky Bird é um jogo arcade puro em **HTML5, CSS3 e JavaScript vanilla**, sem dependências externas e sem etapa de build. Perfeito para portfólio, demonstração ou estudo de desenvolvimento web.

**Características principais:**
- ✨ Interface moderna e responsiva (desktop e mobile)
- 🎨 Visual caprichado com animações fluidas
- 💾 Sistema de pontuação com recorde persistido no LocalStorage
- ⚡ Desempenho otimizado com Canvas 2D
- 🚀 Pronto para publicação em GitHub Pages

## 🚀 Quick Start

### Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/jogo-fly-bird.git
   cd jogo-fly-bird
   ```

2. Rode com um servidor local:
   ```bash
   # Exemplo com Python 3
   python -m http.server 8000
   # Acesse http://localhost:8000
   ```

### Publicar no GitHub Pages

1. Habilite GitHub Pages nas configurações do repositório
2. Selecione a branch `main` como source
3. Acesse seu jogo em `https://seu-usuario.github.io/jogo-fly-bird`

## 🎮 Controles

| Ação | Controle |
|------|----------|
| Pular | Espaço, Clique do mouse ou Toque na tela |
| Reiniciar | Espaço, Clique ou Toque após game over |

## 📁 Estrutura do Projeto

```
jogo-fly-bird/
├── index.html
├── src/
│   ├── js/
│   │   ├── core/       # Serviços compartilhados, como storage
│   │   ├── game/       # Estado, regras, colisões, input e loop do jogo
│   │   ├── rendering/  # Renderização Canvas 2D
│   │   ├── ui/         # Integração com DOM e HUD
│   │   └── main.js     # Composição da aplicação
│   └── styles/
│       └── main.css    # Estilos, responsividade e temas
├── README.md
├── LICENSE
└── .gitignore
```

## 🛠️ Stack Técnico

- **HTML5:** Semântica, Canvas 2D API, LocalStorage
- **CSS3:** Grid, Flexbox, animações, gradientes, responsividade mobile-first
- **JavaScript:** Vanilla JS com ES Modules, game loop, gerenciamento de estado

**Nenhuma dependência de build** – O projeto roda em qualquer navegador moderno usando um servidor estático local ou GitHub Pages.

## 🎨 Design & UX

- **Layout responsivo:** Funciona perfeitamente em desktop, tablet e mobile
- **Paleta de cores:** Tons de azul (céu) e laranja (acentos de ação)
- **Tipografia:** Fredoka (Google Fonts) para leiturabilidade
- **Contrast:** Acessibilidade com ratios WCAG AA+

## 📊 Desempenho

- **Tamanho do projeto:** < 50KB (HTML + CSS + JS)
- **Dependências externas:** Apenas Google Fonts (opcional)
- **FPS:** ~60fps em navegadores modernos
- **Tempo de carregamento:** < 1s em conexão 4G

## 💡 Como o Jogo Funciona

### Game Loop
O jogo utiliza `requestAnimationFrame()` para atualizar 60 vezes por segundo:
1. **Update:** Atualiza posição do pássaro, canos e núvens
2. **Detecção de colisão:** Verifica colisões com obstáculos
3. **Render:** Desenha tudo no canvas

### Persistência
- Recorde é salvo em `localStorage` com a chave `sky-bird-best-score`
- Recuperado automaticamente ao recarregar a página

## 🐛 Troubleshooting

**O jogo não funciona?**
- Verifique se o navegador suporta Canvas 2D e ES Modules
- Execute por um servidor local, como `python -m http.server 8000`
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Use um navegador moderno: Chrome, Firefox, Safari ou Edge

**Recorde desapareceu?**
- Verifique se o navegador permite LocalStorage
- Tente acessar em modo normal (não privado/incógnito)

## 📚 Recursos para Aprender

- [Canvas API - MDN Web Docs](https://developer.mozilla.org/pt-BR/docs/Web/API/Canvas_API)
- [Game Development Patterns](https://gameprogrammingpatterns.com/)
- [Responsive Web Design - Mozilla](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Responsive_design)

## 🤝 Contribuição

Encontrou um bug? Quer adicionar uma feature? Abra uma [issue](https://github.com/seu-usuario/jogo-fly-bird/issues) ou faça um [pull request](https://github.com/seu-usuario/jogo-fly-bird/pulls)!

**Ideias para melhorias:**
- 🎵 Sistema de áudio (sons de efeito e música de fundo)
- 🎨 Mais temas/skins para o pássaro
- ⚙️ Menu de dificuldade
- 🌐 Ranking online (com backend)
- 📱 Progressive Web App (offline support)

## 📄 Licença

Este projeto é licenciado sob a **MIT License** – veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

Feito com ❤️ por Leandro Toledo (https://github.com/Le-Toledo)

Visite meu LinkedIn:(https://www.linkedin.com/in/leandro-toledo88/)

---

<sub>Inspirado em Flappy Bird, de Dong Nguyen. Este é um projeto educacional de código aberto.</sub>
