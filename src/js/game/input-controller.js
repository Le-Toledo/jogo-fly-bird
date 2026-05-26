export function createInputController({ canvas, actionButton, onAction }) {
  const handleKeyboard = (event) => {
    if (event.code !== "Space") {
      return;
    }

    event.preventDefault();
    onAction();
  };

  const handlePointer = (event) => {
    event.preventDefault();
    onAction();
  };

  actionButton.addEventListener("click", onAction);
  canvas.addEventListener("pointerdown", handlePointer);
  window.addEventListener("keydown", handleKeyboard);

  return {
    destroy() {
      actionButton.removeEventListener("click", onAction);
      canvas.removeEventListener("pointerdown", handlePointer);
      window.removeEventListener("keydown", handleKeyboard);
    }
  };
}
