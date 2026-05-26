export function createScoreStorage(storageKey) {
  return {
    getBestScore() {
      return Number(localStorage.getItem(storageKey) || 0);
    },

    saveBestScore(score) {
      localStorage.setItem(storageKey, String(score));
    }
  };
}
