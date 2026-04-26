import { Difficulty, GamePace, Thought } from "../types";

const roll = (): number => Math.random() * 100;

export const pickDifficultyByTime = (roundTimeLeft: number): Difficulty => {
  const r = roll();
  if (roundTimeLeft > 40) {
    if (r < 78) return "easy";
    if (r < 96) return "medium";
    return "spicy";
  }
  if (roundTimeLeft > 20) {
    if (r < 60) return "easy";
    if (r < 88) return "medium";
    return "spicy";
  }
  if (r < 45) return "easy";
  if (r < 80) return "medium";
  return "spicy";
};

const TIMEOUT_MULTIPLIER_BY_PACE: Record<GamePace, number> = {
  calm: 1.35,
  standard: 1,
  fast: 0.82,
};

export const thoughtTimeoutMs = (thought: Thought, pace: GamePace): number => {
  const baseTimeout = Math.max(3200, Math.floor(5600 / thought.speed));
  return Math.floor(baseTimeout * TIMEOUT_MULTIPLIER_BY_PACE[pace]);
};
