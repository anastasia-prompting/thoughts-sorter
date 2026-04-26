import { GamePace } from "../types";
import { sceneBackgrounds } from "../theme/visualAssets";
import { useGameStore } from "../store/gameStore";

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen = ({ onBack }: SettingsScreenProps) => {
  const progress = useGameStore((state) => state.progress);
  const resetProgress = useGameStore((state) => state.resetProgress);

  const updateProgress = (
    key: "soundEnabled" | "animationsEnabled" | "gamePace",
    value: boolean | GamePace,
  ) => {
    useGameStore.setState((state) => ({
      progress: {
        ...state.progress,
        [key]: value,
      },
    }));
  };

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${sceneBackgrounds.start})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,19,34,0.6)_0%,rgba(14,19,34,0.82)_100%)]" />
      <div
        className="relative z-10 flex h-full w-full overflow-y-auto"
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 1rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)",
        }}
      >
        <div className="m-auto flex w-full max-w-md flex-col gap-4 px-5 sm:max-w-lg sm:px-6 md:max-w-xl md:gap-5 md:px-8">
          <h2 className="text-2xl font-semibold md:text-3xl">Настройки</h2>
          <label className="flex items-center justify-between rounded-2xl border border-[#e5e7ee20] bg-mist/10 p-3 backdrop-blur-sm md:p-4">
            <span>Звук</span>
            <input
              type="checkbox"
              checked={progress.soundEnabled}
              onChange={(event) => updateProgress("soundEnabled", event.target.checked)}
            />
          </label>
          <label className="flex items-center justify-between rounded-2xl border border-[#e5e7ee20] bg-mist/10 p-3 backdrop-blur-sm md:p-4">
            <span>Анимации</span>
            <input
              type="checkbox"
              checked={progress.animationsEnabled}
              onChange={(event) => updateProgress("animationsEnabled", event.target.checked)}
            />
          </label>
          <div className="space-y-2 rounded-2xl border border-[#e5e7ee20] bg-mist/10 p-3 backdrop-blur-sm md:p-4">
            <p className="text-sm text-soft">Темп игры</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => updateProgress("gamePace", "calm")}
                className={`rounded-xl px-2 py-2 text-sm transition ${
                  progress.gamePace === "calm" ? "bg-accent2/35 text-mist" : "bg-mist/5 text-soft"
                }`}
              >
                Спокойный
              </button>
              <button
                type="button"
                onClick={() => updateProgress("gamePace", "standard")}
                className={`rounded-xl px-2 py-2 text-sm transition ${
                  progress.gamePace === "standard" ? "bg-accent/35 text-mist" : "bg-mist/5 text-soft"
                }`}
              >
                Стандарт
              </button>
              <button
                type="button"
                onClick={() => updateProgress("gamePace", "fast")}
                className={`rounded-xl px-2 py-2 text-sm transition ${
                  progress.gamePace === "fast" ? "bg-accent3/35 text-mist" : "bg-mist/5 text-soft"
                }`}
              >
                Быстрый
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const approved = window.confirm(
                "Всё, что ты успела поймать, исчезнет.\nНачнёшь с чистого листа.",
              );
              if (approved) resetProgress();
            }}
            className="w-full rounded-2xl bg-accent3/40 px-4 py-3 text-mist transition hover:brightness-110 md:py-4"
          >
            Сбросить прогресс
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full rounded-2xl border border-[#e5e7ee20] bg-mist/10 px-4 py-3 text-mist transition hover:bg-mist/20 md:py-4"
          >
            Назад
          </button>
        </div>
      </div>
    </section>
  );
};
