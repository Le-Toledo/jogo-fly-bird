import { GAME_CONFIG } from "./config.js";
import { hitsWorldBounds, intersectsPipe } from "./collisions.js";

export function resetWorld(state, canvas) {
  state.mode = "ready";
  state.frame = 0;
  state.score = 0;
  state.speed = GAME_CONFIG.initialSpeed;
  state.bird.y = canvas.height / 2 - 40;
  state.bird.velocity = 0;
  state.bird.rotation = 0;
  state.pipes = [];
}

export function updateWorld(state, canvas, onScore, onGameOver) {
  state.frame += 1;
  updateClouds(state, canvas);

  if (state.mode !== "playing") {
    updateBirdFloat(state);
    return;
  }

  if (state.frame % GAME_CONFIG.pipeSpawnInterval === 0) {
    spawnPipe(state, canvas);
  }

  updateBirdPhysics(state);
  updatePipes(state, onScore, onGameOver);

  if (hitsWorldBounds(state.bird, canvas.height)) {
    onGameOver();
  }
}

function updateClouds(state, canvas) {
  for (const cloud of state.clouds) {
    cloud.x -= cloud.speed;

    if (cloud.x + cloud.w >= -20) {
      continue;
    }

    cloud.x = canvas.width + Math.random() * 80;
  }
}

function updateBirdFloat(state) {
  state.bird.y += Math.sin(state.frame / 14) * 0.45;
}

function updateBirdPhysics(state) {
  state.speed += 0.0008;
  state.bird.velocity += GAME_CONFIG.gravity;
  state.bird.y += state.bird.velocity;
  state.bird.rotation = Math.max(-0.6, Math.min(1.2, state.bird.velocity / 10));
}

function updatePipes(state, onScore, onGameOver) {
  for (const pipe of state.pipes) {
    pipe.x -= state.speed;

    if (!pipe.scored && pipe.x + GAME_CONFIG.pipeWidth < state.bird.x) {
      pipe.scored = true;
      state.score += 1;
      onScore();
    }

    if (intersectsPipe(state.bird, pipe)) {
      onGameOver();
    }
  }

  state.pipes = state.pipes.filter((pipe) => pipe.x + GAME_CONFIG.pipeWidth > -20);
}

function spawnPipe(state, canvas) {
  const margin = 90;
  const maxTopHeight = canvas.height - GAME_CONFIG.pipeGap - GAME_CONFIG.groundHeight - margin;
  const topHeight = margin + Math.random() * (maxTopHeight - margin);

  state.pipes.push({
    x: canvas.width + GAME_CONFIG.pipeWidth,
    topHeight,
    scored: false
  });
}
