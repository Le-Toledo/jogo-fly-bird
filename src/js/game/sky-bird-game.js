import { GAME_CONFIG, GAME_COPY } from "./config.js";
import { resetWorld, updateWorld } from "./world.js";

export class SkyBirdGame {
  constructor({ canvas, renderer, scoreStorage, state, ui }) {
    this.canvas = canvas;
    this.renderer = renderer;
    this.scoreStorage = scoreStorage;
    this.state = state;
    this.ui = ui;
    this.animationFrameId = null;

    this.handleAction = this.handleAction.bind(this);
    this.loop = this.loop.bind(this);
  }

  boot() {
    this.ui.updateBestScore(this.state.bestScore);
    this.reset();
    this.loop();
  }

  reset() {
    resetWorld(this.state, this.canvas);
    this.syncScore();
    this.ui.showOverlay(GAME_COPY.readyTitle, GAME_COPY.readyText, GAME_COPY.readyButton);
  }

  handleAction() {
    if (this.state.mode === "over") {
      this.reset();
    }

    if (this.state.mode === "ready") {
      this.start();
      return;
    }

    this.flap();
  }

  start() {
    if (this.state.mode === "playing") {
      return;
    }

    this.state.mode = "playing";
    this.ui.hideOverlay();
    this.flap();
  }

  flap() {
    if (this.state.mode !== "playing") {
      return;
    }

    this.state.bird.velocity = GAME_CONFIG.jumpForce;
  }

  syncScore() {
    this.ui.updateScore(this.state.score);

    if (this.state.score <= this.state.bestScore) {
      return;
    }

    this.state.bestScore = this.state.score;
    this.ui.updateBestScore(this.state.bestScore);
    this.scoreStorage.saveBestScore(this.state.bestScore);
  }

  endGame() {
    if (this.state.mode === "over") {
      return;
    }

    const plural = this.state.score === 1 ? "" : "s";
    this.state.mode = "over";
    this.ui.showOverlay(
      GAME_COPY.gameOverTitle,
      `Você fez ${this.state.score} ponto${plural}. Clique para tentar de novo.`,
      GAME_COPY.restartButton
    );
  }

  loop() {
    updateWorld(
      this.state,
      this.canvas,
      () => this.syncScore(),
      () => this.endGame()
    );
    this.renderer.render(this.state);
    this.animationFrameId = requestAnimationFrame(this.loop);
  }
}
