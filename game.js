/**
 * Sky Bird - Jogo Arcade em HTML5
 * 
 * Um jogo inspirado em Flappy Bird com renderização Canvas 2D,
 * detecção de colisão física e persistência de dados via LocalStorage.
 * 
 * @author Seu Nome
 * @version 1.0.0
 * @license MIT
 */

// ============================================================================
// DOM ELEMENTS
// ============================================================================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("best-score");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayText = document.getElementById("overlay-text");
const actionButton = document.getElementById("action-button");

// ============================================================================
// CONFIGURAÇÕES E CONSTANTES
// ============================================================================

/** Chave para armazenamento do recorde no LocalStorage */
const STORAGE_KEY = "sky-bird-best-score";

/** Altura em pixels do terreno no final da tela */
const GROUND_HEIGHT = 86;

// ============================================================================
// ESTADO DO JOGO
// ============================================================================

/**
 * Objeto central de estado do jogo.
 * Contém informações sobre o pássaro, canos, nuvens e modo de jogo.
 * 
 * @type {Object}
 * @property {string} mode - Estado atual ('ready', 'playing', 'over')
 * @property {number} frame - Contador de frames desde o início
 * @property {number} score - Pontuação atual
 * @property {number} bestScore - Melhor pontuação registrada
 * @property {number} speed - Velocidade de movimento dos canos (aumenta com o tempo)
 * @property {number} gravity - Aceleração gravitacional aplicada ao pássaro
 * @property {number} jump - Velocidade vertical ao pular
 * @property {number} gap - Altura em pixels do espaço entre os canos
 * @property {number} pipeWidth - Largura em pixels dos canos
 * @property {number} spawnEvery - A cada N frames um novo cano é criado
 * @property {Object} bird - Dados do pássaro (x, y, radius, velocity, rotation)
 * @property {Array} pipes - Lista de canos ativos
 * @property {Array} clouds - Lista de nuvens (decoração, com movimento)
 */
const state = {
  mode: "ready",
  frame: 0,
  score: 0,
  bestScore: Number(localStorage.getItem(STORAGE_KEY) || 0),
  speed: 2.8,
  gravity: 0.34,
  jump: -6.7,
  gap: 180,
  pipeWidth: 72,
  spawnEvery: 92,
  bird: {
    x: 112,
    y: 320,
    radius: 18,
    velocity: 0,
    rotation: 0
  },
  pipes: [],
  clouds: [
    { x: 40, y: 120, w: 72, h: 28, speed: 0.35 },
    { x: 250, y: 200, w: 94, h: 30, speed: 0.2 },
    { x: 180, y: 72, w: 64, h: 22, speed: 0.28 }
  ]
};

bestScoreEl.textContent = String(state.bestScore);

// ============================================================================
// FUNÇÕES DE CONTROLE DO JOGO
// ============================================================================

/**
 * Reinicia o jogo para o estado inicial.
 * Reseta pontuação, posição do pássaro, velocidade e recupera recorde do storage.
 */
function resetGame() {
  state.mode = "ready";
  state.frame = 0;
  state.score = 0;
  state.speed = 2.8;
  state.bird.y = canvas.height / 2 - 40;
  state.bird.velocity = 0;
  state.bird.rotation = 0;
  state.pipes = [];
  updateScore();
  showOverlay("Clique para voar", "Pressione espaço, clique ou toque para começar.", "Jogar");
}

/**
 * Inicia o jogo a partir do estado 'ready'.
 * Se o jogo terminou, reinicia antes de começar.
 */
function startGame() {
  if (state.mode === "over") {
    resetGame();
  }

  if (state.mode === "playing") {
    return;
  }

  state.mode = "playing";
  hideOverlay();
  flap();
}

/**
 * Executa o movimento de pulo do pássaro.
 * Se o jogo está em estado 'ready', inicia o jogo.
 * Se está 'playing', aplica velocidade de pulo ao pássaro.
 */
function flap() {
  if (state.mode === "ready") {
    startGame();
    return;
  }

  if (state.mode !== "playing") {
    return;
  }

  state.bird.velocity = state.jump;
}

/**
 * Atualiza a pontuação na tela e no storage se houver novo recorde.
 */
function updateScore() {
  scoreEl.textContent = String(state.score);

  if (state.score <= state.bestScore) {
    return;
  }

  state.bestScore = state.score;
  bestScoreEl.textContent = String(state.bestScore);
  localStorage.setItem(STORAGE_KEY, String(state.bestScore));
}

/**
 * Exibe uma modal de overlay com título, texto e botão de ação.
 * @param {string} title - Título da modal
 * @param {string} text - Texto descritivo
 * @param {string} buttonLabel - Texto do botão
 */
function showOverlay(title, text, buttonLabel) {
  overlayTitle.textContent = title;
  overlayText.textContent = text;
  actionButton.textContent = buttonLabel;
  overlay.classList.remove("hidden");
}

/**
 * Oculta o overlay modal.
 */
function hideOverlay() {
  overlay.classList.add("hidden");
}

/**
 * Cria um novo cano com altura aleatória.
 * A altura do espaço é fixa (state.gap), mas a posição varia aleatoriamente.
 */
function spawnPipe() {
  const margin = 90;
  const maxTopHeight = canvas.height - state.gap - GROUND_HEIGHT - margin;
  const topHeight = margin + Math.random() * (maxTopHeight - margin);

  state.pipes.push({
    x: canvas.width + state.pipeWidth,
    topHeight,
    scored: false
  });
}

/**
 * Encerra o jogo quando o pássaro colide ou sai da tela.
 * Exibe modal com pontuação final.
 */
function endGame() {
  if (state.mode === "over") {
    return;
  }

  state.mode = "over";
  showOverlay("Fim de jogo", `Você fez ${state.score} ponto${state.score === 1 ? "" : "s"}. Clique para tentar de novo.`, "Reiniciar");
}

/**
 * Verifica colisão circular do pássaro com um cano específico.
 * Utiliza detecção AABB (Axis-Aligned Bounding Box) da circunferência.
 * 
 * @param {Object} pipe - Objeto cano com propriedades x, topHeight
 * @returns {boolean} true se há colisão
 */
function intersectsPipe(pipe) {
  const birdLeft = state.bird.x - state.bird.radius;
  const birdRight = state.bird.x + state.bird.radius;
  const birdTop = state.bird.y - state.bird.radius;
  const birdBottom = state.bird.y + state.bird.radius;
  const pipeRight = pipe.x + state.pipeWidth;
  const gapStart = pipe.topHeight;
  const gapEnd = pipe.topHeight + state.gap;

  const hitsHorizontal = birdRight > pipe.x && birdLeft < pipeRight;
  const hitsVertical = birdTop < gapStart || birdBottom > gapEnd;

  return hitsHorizontal && hitsVertical;
}

// ============================================================================
// FUNÇÕES DE ATUALIZAÇÃO (UPDATE)
// ============================================================================

/**
 * Atualiza a posição das nuvens com paralaxe.
 * Quando uma nuvem sai da tela, é reinserida pelo lado direito.
 */
function updateClouds() {
  for (const cloud of state.clouds) {
    cloud.x -= cloud.speed;

    if (cloud.x + cloud.w >= -20) {
      continue;
    }

    cloud.x = canvas.width + Math.random() * 80;
  }
}

/**
 * Aplica movimento flutuante ao pássaro quando o jogo não está rodando.
 * Usa senóide para criar animação suave e contínua.
 */
function updateBirdFloat() {
  state.bird.y += Math.sin(state.frame / 14) * 0.45;
}

/**
 * Aplica física ao pássaro: gravidade, velocidade e rotação baseada em velocidade.
 * A dificuldade aumenta gradualmente com aumento de velocidade.
 */
function updateBirdPhysics() {
  state.speed += 0.0008;
  state.bird.velocity += state.gravity;
  state.bird.y += state.bird.velocity;
  state.bird.rotation = Math.max(-0.6, Math.min(1.2, state.bird.velocity / 10));
}

/**
 * Atualiza posição dos canos, detecta passagens (pontos) e colisões.
 * Remove canos que saíram da tela.
 */
function updatePipes() {
  for (const pipe of state.pipes) {
    pipe.x -= state.speed;

    if (!pipe.scored && pipe.x + state.pipeWidth < state.bird.x) {
      pipe.scored = true;
      state.score += 1;
      updateScore();
    }

    if (intersectsPipe(pipe)) {
      endGame();
    }
  }

  state.pipes = state.pipes.filter((pipe) => pipe.x + state.pipeWidth > -20);
}

/**
 * Frame principal de atualização.
 * Executa lógica do jogo: movimento, colisões, pontuação.
 * Chamado 60 vezes por segundo.
 */
function update() {
  state.frame += 1;
  updateClouds();

  if (state.mode !== "playing") {
    updateBirdFloat();
    return;
  }

  if (state.frame % state.spawnEvery === 0) {
    spawnPipe();
  }

  updateBirdPhysics();
  updatePipes();

  if (state.bird.y + state.bird.radius > canvas.height - GROUND_HEIGHT || state.bird.y - state.bird.radius < 0) {
    endGame();
  }
}

// ============================================================================
// FUNÇÕES DE RENDERIZAÇÃO (DRAW)
// ============================================================================

/**
 * Desenha o fundo do jogo.
 * Inclui: gradiente de céu, nuvens, terreno com efeito de profundidade.
 */
function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#7fd4ff");
  gradient.addColorStop(0.6, "#9be8ff");
  gradient.addColorStop(1, "#f8df8f");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.78)";
  for (const cloud of state.clouds) {
    drawCloud(cloud.x, cloud.y, cloud.w, cloud.h);
  }

  ctx.fillStyle = "#b7e57b";
  ctx.fillRect(0, canvas.height - GROUND_HEIGHT, canvas.width, GROUND_HEIGHT);

  ctx.fillStyle = "#7abc43";
  ctx.fillRect(0, canvas.height - 74, canvas.width, 16);

  ctx.fillStyle = "#dbbd76";
  for (let x = 0; x < canvas.width + 20; x += 32) {
    ctx.fillRect(x, canvas.height - 58, 18, 6);
  }
}

/**
 * Desenha uma nuvem usando três elipses.
 * @param {number} x - Posição X da nuvem
 * @param {number} y - Posição Y da nuvem
 * @param {number} w - Largura da nuvem
 * @param {number} h - Altura da nuvem
 */
function drawCloud(x, y, w, h) {
  ctx.beginPath();
  ctx.ellipse(x, y, w * 0.3, h * 0.55, 0, 0, Math.PI * 2);
  ctx.ellipse(x + w * 0.25, y - 10, w * 0.28, h * 0.6, 0, 0, Math.PI * 2);
  ctx.ellipse(x + w * 0.53, y, w * 0.3, h * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Desenha um cano com efeito de profundidade.
 * Muda de cor quando o jogo termina (feedback visual).
 * @param {Object} pipe - Objeto cano
 */
function drawPipe(pipe) {
  const gapBottom = pipe.topHeight + state.gap;

  ctx.fillStyle = state.mode === "over" ? "#4a9f44" : "#58c24e";
  ctx.fillRect(pipe.x, 0, state.pipeWidth, pipe.topHeight);
  ctx.fillRect(pipe.x, gapBottom, state.pipeWidth, canvas.height - gapBottom - GROUND_HEIGHT);

  ctx.fillStyle = "#2f8d2d";
  ctx.fillRect(pipe.x - 4, pipe.topHeight - 16, state.pipeWidth + 8, 16);
  ctx.fillRect(pipe.x - 4, gapBottom, state.pipeWidth + 8, 16);

  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  ctx.fillRect(pipe.x + 8, 0, 10, pipe.topHeight);
  ctx.fillRect(pipe.x + 8, gapBottom, 10, canvas.height - gapBottom - GROUND_HEIGHT);
}

/**
 * Desenha o pássaro (círculo amarelo) com penas (triângulo) e olho.
 * Aplica rotação baseada na velocidade para feedback físico.
 */
function drawBird() {
  ctx.save();
  ctx.translate(state.bird.x, state.bird.y);
  ctx.rotate(state.bird.rotation);

  ctx.fillStyle = "#ffd34d";
  ctx.beginPath();
  ctx.arc(0, 0, state.bird.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ff9d2e";
  ctx.beginPath();
  ctx.moveTo(8, 2);
  ctx.lineTo(28, -2);
  ctx.lineTo(8, -10);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#fff3be";
  ctx.beginPath();
  ctx.arc(-4, 2, state.bird.radius * 0.62, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1b1f24";
  ctx.beginPath();
  ctx.arc(6, -6, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f26d5b";
  ctx.beginPath();
  ctx.ellipse(-6, 8, 9, 6, -0.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Exibe textos de guia ao jogador quando o jogo não está rodando.
 * Mostrado apenas em estado 'ready' ou 'over'.
 */
function drawGuide() {
  if (state.mode === "playing") {
    return;
  }

  ctx.fillStyle = "rgba(18, 49, 78, 0.75)";
  ctx.font = '700 24px "Fredoka", sans-serif';
  ctx.textAlign = "center";
  ctx.fillText("Espaço, clique ou toque", canvas.width / 2, 80);
}

/**
 * Função de renderização que desenha todos os elementos do jogo.
 * Chamada após cada atualização, 60 vezes por segundo.
 */
function render() {
  drawBackground();

  for (const pipe of state.pipes) {
    drawPipe(pipe);
  }

  drawBird();
  drawGuide();
}

// ============================================================================
// GAME LOOP E ENTRADA
// ============================================================================

/**
 * Loop principal do jogo usando requestAnimationFrame.
 * Executa update() e render() em cada frame (~60 FPS).
 */
function loop() {
  update();
  render();
  requestAnimationFrame(loop);
}

/**
 * Trata entrada do usuário (teclado).
 * Ignora todas as teclas exceto espaço.
 * @param {KeyboardEvent} event - Evento de teclado
 */
function handleInput(event) {
  if (event.type === "keydown" && event.code !== "Space") {
    return;
  }

  event.preventDefault();
  flap();
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

// Event Listeners para entrada do usuário
actionButton.addEventListener("click", startGame);
canvas.addEventListener("pointerdown", flap);
window.addEventListener("keydown", handleInput);

// Inicia o jogo
resetGame();
loop();
