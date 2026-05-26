import { GAME_CONFIG } from "../game/config.js";

export function createCanvasRenderer(canvas) {
  const ctx = canvas.getContext("2d");

  return {
    render(state) {
      drawBackground(ctx, canvas, state);

      for (const pipe of state.pipes) {
        drawPipe(ctx, canvas, state, pipe);
      }

      drawBird(ctx, state.bird);
      drawGuide(ctx, canvas, state.mode);
    }
  };
}

function drawBackground(ctx, canvas, state) {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#7fd4ff");
  gradient.addColorStop(0.6, "#9be8ff");
  gradient.addColorStop(1, "#f8df8f");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.78)";
  for (const cloud of state.clouds) {
    drawCloud(ctx, cloud.x, cloud.y, cloud.w, cloud.h);
  }

  ctx.fillStyle = "#b7e57b";
  ctx.fillRect(0, canvas.height - GAME_CONFIG.groundHeight, canvas.width, GAME_CONFIG.groundHeight);

  ctx.fillStyle = "#7abc43";
  ctx.fillRect(0, canvas.height - 74, canvas.width, 16);

  ctx.fillStyle = "#dbbd76";
  for (let x = 0; x < canvas.width + 20; x += 32) {
    ctx.fillRect(x, canvas.height - 58, 18, 6);
  }
}

function drawCloud(ctx, x, y, w, h) {
  ctx.beginPath();
  ctx.ellipse(x, y, w * 0.3, h * 0.55, 0, 0, Math.PI * 2);
  ctx.ellipse(x + w * 0.25, y - 10, w * 0.28, h * 0.6, 0, 0, Math.PI * 2);
  ctx.ellipse(x + w * 0.53, y, w * 0.3, h * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawPipe(ctx, canvas, state, pipe) {
  const gapBottom = pipe.topHeight + GAME_CONFIG.pipeGap;

  ctx.fillStyle = state.mode === "over" ? "#4a9f44" : "#58c24e";
  ctx.fillRect(pipe.x, 0, GAME_CONFIG.pipeWidth, pipe.topHeight);
  ctx.fillRect(
    pipe.x,
    gapBottom,
    GAME_CONFIG.pipeWidth,
    canvas.height - gapBottom - GAME_CONFIG.groundHeight
  );

  ctx.fillStyle = "#2f8d2d";
  ctx.fillRect(pipe.x - 4, pipe.topHeight - 16, GAME_CONFIG.pipeWidth + 8, 16);
  ctx.fillRect(pipe.x - 4, gapBottom, GAME_CONFIG.pipeWidth + 8, 16);

  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  ctx.fillRect(pipe.x + 8, 0, 10, pipe.topHeight);
  ctx.fillRect(pipe.x + 8, gapBottom, 10, canvas.height - gapBottom - GAME_CONFIG.groundHeight);
}

function drawBird(ctx, bird) {
  ctx.save();
  ctx.translate(bird.x, bird.y);
  ctx.rotate(bird.rotation);

  ctx.fillStyle = "#ffd34d";
  ctx.beginPath();
  ctx.arc(0, 0, bird.radius, 0, Math.PI * 2);
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
  ctx.arc(-4, 2, bird.radius * 0.62, 0, Math.PI * 2);
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

function drawGuide(ctx, canvas, mode) {
  if (mode === "playing") {
    return;
  }

  ctx.fillStyle = "rgba(18, 49, 78, 0.75)";
  ctx.font = '700 24px "Fredoka", sans-serif';
  ctx.textAlign = "center";
  ctx.fillText("Espaço, clique ou toque", canvas.width / 2, 80);
}
