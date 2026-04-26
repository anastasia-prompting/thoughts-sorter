export type Bucket = "do" | "save" | "release";
export type Difficulty = "easy" | "medium" | "spicy";
export type GamePace = "calm" | "standard" | "fast";
export type ScreenState =
  | "start"
  | "tutorial"
  | "playing"
  | "paused"
  | "results"
  | "stats"
  | "settings";

export interface Thought {
  id: string;
  text: string;
  correctBucket: Bucket;
  difficulty: Difficulty;
  speed: number;
  rarity: "common" | "uncommon" | "rare";
}

export interface SpawnedThought extends Thought {
  x: number;
  y: number;
}

export interface RoundStats {
  score: number;
  caught: number;
  missed: number;
  combo: number;
  bestCombo: number;
  byBucket: Record<Bucket, number>;
  correctInRow: number;
}

export interface RoundResult extends RoundStats {
  phrase: string;
}

export interface UiFeedback {
  text: string;
  tone: "neutral" | "good" | "soft";
}

export interface PlayerProgress {
  bestScore: number;
  totalRounds: number;
  totalCaught: number;
  bucketTotals: Record<Bucket, number>;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  gamePace: GamePace;
}
