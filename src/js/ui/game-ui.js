export function createGameUi(elements) {
  return {
    updateScore(score) {
      elements.score.textContent = String(score);
    },

    updateBestScore(bestScore) {
      elements.bestScore.textContent = String(bestScore);
    },

    showOverlay(title, text, buttonLabel) {
      elements.overlayTitle.textContent = title;
      elements.overlayText.textContent = text;
      elements.actionButton.textContent = buttonLabel;
      elements.overlay.classList.remove("hidden");
    },

    hideOverlay() {
      elements.overlay.classList.add("hidden");
    }
  };
}
