import { GAME_CONFIG } from "./config.js";

export function createInitialState(bestScore) {
  return {
    mode: "ready",
    frame: 0,
    score: 0,
    bestScore,
    speed: GAME_CONFIG.initialSpeed,
    bird: {
      x: GAME_CONFIG.birdStartX,
      y: 320,
      radius: GAME_CONFIG.birdRadius,
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
}
