import { createScoreStorage } from "./core/storage.js";
import { GAME_CONFIG } from "./game/config.js";
import { createInitialState } from "./game/create-state.js";
import { createInputController } from "./game/input-controller.js";
import { SkyBirdGame } from "./game/sky-bird-game.js";
import { createCanvasRenderer } from "./rendering/canvas-renderer.js";
import { getDomElements } from "./ui/dom.js";
import { createGameUi } from "./ui/game-ui.js";

const elements = getDomElements();
const scoreStorage = createScoreStorage(GAME_CONFIG.storageKey);
const state = createInitialState(scoreStorage.getBestScore());
const renderer = createCanvasRenderer(elements.canvas);
const ui = createGameUi(elements);

const game = new SkyBirdGame({
  canvas: elements.canvas,
  renderer,
  scoreStorage,
  state,
  ui
});

createInputController({
  canvas: elements.canvas,
  actionButton: elements.actionButton,
  onAction: game.handleAction
});

game.boot();
