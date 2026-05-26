const selectors = {
  canvas: "#game",
  score: "#score",
  bestScore: "#best-score",
  overlay: "#overlay",
  overlayTitle: "#overlay-title",
  overlayText: "#overlay-text",
  actionButton: "#action-button"
};

export function getDomElements() {
  return Object.fromEntries(
    Object.entries(selectors).map(([name, selector]) => [name, queryRequired(selector)])
  );
}

function queryRequired(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Elemento obrigatório não encontrado: ${selector}`);
  }

  return element;
}
