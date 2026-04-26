import { Bucket, GamePace, RoundStats, Thought, UiFeedback } from "../types";
import { pickDifficultyByTime } from "../utils/thoughts";

export const ROUND_SECONDS = 60;
export const MAX_ACTIVE_THOUGHTS = 6;

const SPAWN_RANGE_BY_PACE: Record<GamePace, { min: number; max: number }> = {
  calm: { min: 2100, max: 3400 },
  standard: { min: 1700, max: 3000 },
  fast: { min: 1200, max: 2200 },
};

export const RESULT_PHRASES = [
  "Чуть тише в голове",
  "Не всё нужно нести дальше",
  "Хаос слегка приручен",
  "Сегодня ты хорошо отпускала лишнее",
  "Немного порядка тоже считается",
  "Не идеально. И не нужно",
  "Несколько мыслей пойманы вовремя",
  "Что-то важное ты всё-таки удержала",
];

export const initialRoundStats = (): RoundStats => ({
  score: 0,
  caught: 0,
  missed: 0,
  combo: 0,
  bestCombo: 0,
  byBucket: { do: 0, save: 0, release: 0 },
  correctInRow: 0,
});

export const randomRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const nextSpawnDelay = (pace: GamePace): number => {
  const range = SPAWN_RANGE_BY_PACE[pace];
  return randomRange(range.min, range.max);
};

export const pickThought = (
  allThoughts: Thought[],
  usedIds: Set<string>,
  roundTimeLeft: number,
): Thought => {
  const difficulty = pickDifficultyByTime(roundTimeLeft);
  const candidates = allThoughts.filter(
    (thought) => thought.difficulty === difficulty && !usedIds.has(thought.id),
  );
  const pool = candidates.length > 0 ? candidates : allThoughts;
  return pool[randomRange(0, pool.length - 1)];
};

export const applyCatch = (stats: RoundStats): RoundStats => ({
  ...stats,
  score: stats.score + 1,
  caught: stats.caught + 1,
});

export const applyMiss = (stats: RoundStats): RoundStats => ({
  ...stats,
  missed: stats.missed + 1,
  combo: Math.max(0, stats.combo - 1),
  correctInRow: 0,
});

export const applyBucketPick = (
  stats: RoundStats,
  expected: Bucket,
  selected: Bucket,
): { stats: RoundStats; feedback: UiFeedback } => {
  const nextByBucket = { ...stats.byBucket, [selected]: stats.byBucket[selected] + 1 };
  if (expected !== selected) {
    return {
      stats: { ...stats, byBucket: nextByBucket, combo: 0, correctInRow: 0 },
      feedback: { text: "Мимо", tone: "soft" },
    };
  }

  const nextCorrectInRow = stats.correctInRow + 1;
  const nextCombo = stats.combo + 1;
  let score = stats.score + 3;
  if (nextCombo % 5 === 0) score += 4;
  else if (nextCombo % 3 === 0) score += 2;

  const feedback =
    nextCombo % 5 === 0 || nextCombo % 3 === 0
      ? { text: "Отличная серия", tone: "good" as const }
      : { text: "Поймано", tone: "good" as const };

  return {
    stats: {
      ...stats,
      score,
      combo: nextCombo,
      bestCombo: Math.max(stats.bestCombo, nextCombo),
      byBucket: nextByBucket,
      correctInRow: nextCorrectInRow,
    },
    feedback,
  };
};
