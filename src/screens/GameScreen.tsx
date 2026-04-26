import { useCallback, useEffect } from "react";
import { BucketButtons } from "../components/BucketButtons";
import { CatchTray } from "../components/CatchTray";
import { ThoughtField } from "../components/ThoughtField";
import { TopHUD } from "../components/TopHUD";
import { nextSpawnDelay } from "../game/engine";
import { useRoundLoop } from "../hooks/useRoundLoop";
import { handleThoughtTimeout, useGameStore } from "../store/gameStore";

export const GameScreen = () => {
  const {
    activeThoughts,
    tray,
    progress,
    roundStats,
    roundTimeLeft,
    spawnThought,
    tickRound,
    catchThought,
    sortTrayThought,
    setPaused,
    isRoundRunning,
    feedback,
    clearFeedback,
  } = useGameStore((state) => state);

  const getSpawnDelay = useCallback(() => nextSpawnDelay(progress.gamePace), [progress.gamePace]);

  useRoundLoop({
    isRunning: isRoundRunning,
    onTick: tickRound,
    onSpawn: spawnThought,
    getNextSpawnDelay: getSpawnDelay,
  });

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => clearFeedback(), 850);
    return () => window.clearTimeout(timer);
  }, [feedback, clearFeedback]);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      <ThoughtField
        thoughts={activeThoughts}
        gamePace={progress.gamePace}
        combo={roundStats.combo}
        animationsEnabled={progress.animationsEnabled}
        onCatch={catchThought}
        onTimeout={handleThoughtTimeout}
      />

      <header
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center"
        style={{ paddingTop: "calc(0.5rem + env(safe-area-inset-top))" }}
      >
        <div className="pointer-events-auto w-full max-w-3xl px-3 sm:px-5 md:px-6 lg:px-8">
          <TopHUD
            score={roundStats.score}
            combo={roundStats.combo}
            timeLeft={roundTimeLeft}
            onPause={() => setPaused(true)}
          />
        </div>
      </header>

      <footer
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center"
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="pointer-events-auto flex w-full max-w-3xl flex-col gap-3 px-3 sm:px-5 md:px-6 lg:px-8">
          <div className="min-h-[2.4rem]">
            {feedback && (
              <div
                className={`mx-auto inline-block rounded-xl border border-[#e5e7ee2e] px-3 py-2 text-sm backdrop-blur ${
                  feedback.tone === "good"
                    ? "bg-[#93a9b040] text-[#e5e7ee]"
                    : feedback.tone === "soft"
                      ? "bg-[#b9b0c93f] text-[#d5d9e2]"
                      : "bg-[#a9b3c238] text-[#dde2ea]"
                }`}
              >
                {feedback.text}
              </div>
            )}
          </div>
          <CatchTray thought={tray} />
          <BucketButtons disabled={!tray} onPick={sortTrayThought} />
        </div>
      </footer>
    </section>
  );
};
