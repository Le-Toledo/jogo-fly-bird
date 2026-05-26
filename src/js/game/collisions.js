import { GAME_CONFIG } from "./config.js";

export function intersectsPipe(bird, pipe) {
  const birdLeft = bird.x - bird.radius;
  const birdRight = bird.x + bird.radius;
  const birdTop = bird.y - bird.radius;
  const birdBottom = bird.y + bird.radius;
  const pipeRight = pipe.x + GAME_CONFIG.pipeWidth;
  const gapStart = pipe.topHeight;
  const gapEnd = pipe.topHeight + GAME_CONFIG.pipeGap;

  const hitsHorizontal = birdRight > pipe.x && birdLeft < pipeRight;
  const hitsVertical = birdTop < gapStart || birdBottom > gapEnd;

  return hitsHorizontal && hitsVertical;
}

export function hitsWorldBounds(bird, canvasHeight) {
  const hitsGround = bird.y + bird.radius > canvasHeight - GAME_CONFIG.groundHeight;
  const hitsCeiling = bird.y - bird.radius < 0;

  return hitsGround || hitsCeiling;
}
