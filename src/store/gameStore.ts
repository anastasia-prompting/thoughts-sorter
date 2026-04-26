import { create } from "zustand";
import { persist } from "zustand/middleware";
import { thoughts } from "../data/thoughts";
import {
  MAX_ACTIVE_THOUGHTS,
  RESULT_PHRASES,
  ROUND_SECONDS,
  applyBucketPick,
  applyCatch,
  applyMiss,
  initialRoundStats,
  pickThought,
} from "../game/engine";
import {
  Bucket,
  PlayerProgress,
  RoundResult,
  ScreenState,
  SpawnedThought,
  UiFeedback,
} from "../types";

interface GameState {
  screen: ScreenState;
  activeThoughts: SpawnedThought[];
  tray: SpawnedThought | null;
  roundTimeLeft: number;
  isRoundRunning: boolean;
  lastResult: RoundResult | null;
  progress: PlayerProgress;
  roundStats: ReturnType<typeof initialRoundStats>;
  usedThoughtIds: string[];
  feedback: UiFeedback | null;
  setScreen: (screen: ScreenState) => void;
  startRound: () => void;
  setPaused: (paused: boolean) => void;
  tickRound: () => void;
  spawnThought: () => void;
  catchThought: (thoughtId: string) => void;
  sortTrayThought: (bucket: Bucket) => void;
  resetProgress: () => void;
  clearFeedback: () => void;
}

const initialProgress: PlayerProgress = {
  bestScore: 0,
  totalRounds: 0,
  totalCaught: 0,
  bucketTotals: { do: 0, save: 0, release: 0 },
  soundEnabled: false,
  animationsEnabled: true,
  gamePace: "standard",
};

const randomPosition = () => ({
  x: Math.random() * 54 + 23,
  y: Math.random() * 40 + 18,
});

const pickResultPhrase = () =>
  RESULT_PHRASES[Math.floor(Math.random() * RESULT_PHRASES.length)];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      screen: "start",
      activeThoughts: [],
      tray: null,
      roundTimeLeft: ROUND_SECONDS,
      isRoundRunning: false,
      lastResult: null,
      progress: initialProgress,
      roundStats: initialRoundStats(),
      usedThoughtIds: [],
      feedback: null,
      setScreen: (screen) => set({ screen }),
      startRound: () =>
        set({
          screen: "playing",
          activeThoughts: [],
          tray: null,
          roundTimeLeft: ROUND_SECONDS,
          isRoundRunning: true,
          lastResult: null,
          roundStats: initialRoundStats(),
          usedThoughtIds: [],
          feedback: null,
        }),
      setPaused: (paused) =>
        set({
          isRoundRunning: !paused,
          screen: paused ? "paused" : "playing",
        }),
      tickRound: () => {
        const state = get();
        if (!state.isRoundRunning) return;

        const nextTime = Math.max(0, state.roundTimeLeft - 1);
        if (nextTime > 0) {
          set({ roundTimeLeft: nextTime });
          return;
        }

        const roundStats = state.roundStats;
        const result: RoundResult = {
          ...roundStats,
          phrase: pickResultPhrase(),
        };

        const progress = state.progress;
        set({
          isRoundRunning: false,
          screen: "results",
          roundTimeLeft: 0,
          activeThoughts: [],
          tray: null,
          lastResult: result,
          progress: {
            ...progress,
            bestScore: Math.max(progress.bestScore, result.score),
            totalRounds: progress.totalRounds + 1,
            totalCaught: progress.totalCaught + result.caught,
            bucketTotals: {
              do: progress.bucketTotals.do + result.byBucket.do,
              save: progress.bucketTotals.save + result.byBucket.save,
              release: progress.bucketTotals.release + result.byBucket.release,
            },
          },
        });
      },
      spawnThought: () => {
        const state = get();
        if (!state.isRoundRunning || state.activeThoughts.length >= MAX_ACTIVE_THOUGHTS) return;

        const usedIds = new Set(state.usedThoughtIds);
        const baseThought = pickThought(thoughts, usedIds, state.roundTimeLeft);
        const nextThought: SpawnedThought = { ...baseThought, ...randomPosition() };

        set({
          activeThoughts: [...state.activeThoughts, nextThought],
          usedThoughtIds: [...state.usedThoughtIds, nextThought.id],
        });
      },
      catchThought: (thoughtId) => {
        const state = get();
        if (!state.isRoundRunning || state.tray) return;
        const thought = state.activeThoughts.find((item) => item.id === thoughtId);
        if (!thought) return;

        set({
          tray: thought,
          activeThoughts: state.activeThoughts.filter((item) => item.id !== thoughtId),
          roundStats: applyCatch(state.roundStats),
          feedback: { text: "Поймано", tone: "neutral" },
        });
      },
      sortTrayThought: (bucket) => {
        const state = get();
        if (!state.tray || !state.isRoundRunning) return;
        const outcome = applyBucketPick(state.roundStats, state.tray.correctBucket, bucket);
        set({
          tray: null,
          roundStats: outcome.stats,
          feedback: outcome.feedback,
        });
      },
      resetProgress: () =>
        set({
          progress: initialProgress,
        }),
      clearFeedback: () => set({ feedback: null }),
    }),
    {
      name: "lost-thoughts-progress",
      partialize: (state) => ({ progress: state.progress }),
      merge: (persisted, current) => {
        const saved = persisted as Partial<GameState> | undefined;
        return {
          ...current,
          progress: {
            ...current.progress,
            ...(saved?.progress ?? {}),
          },
        };
      },
    },
  ),
);

export const handleThoughtTimeout = (thoughtId: string): void => {
  const state = useGameStore.getState();
  if (!state.isRoundRunning) return;
  const exists = state.activeThoughts.some((thought) => thought.id === thoughtId);
  if (!exists) return;
  useGameStore.setState({
    activeThoughts: state.activeThoughts.filter((thought) => thought.id !== thoughtId),
    roundStats: applyMiss(state.roundStats),
    feedback: { text: "Ещё чуть-чуть", tone: "soft" },
  });
};
