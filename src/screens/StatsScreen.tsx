import { PlayerProgress } from "../types";
import { sceneBackgrounds } from "../theme/visualAssets";

interface StatsScreenProps {
  progress: PlayerProgress;
  onBack: () => void;
}

const topBucketLabel = (progress: PlayerProgress): string => {
  const entries = Object.entries(progress.bucketTotals).sort((a, b) => b[1] - a[1]);
  const key = entries[0]?.[0] ?? "do";
  if (key === "do") return "Сделать";
  if (key === "save") return "Сохранить";
  return "Отпустить";
};

export const StatsScreen = ({ progress, onBack }: StatsScreenProps) => (
  <section className="relative h-[100dvh] w-full overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${sceneBackgrounds.results})` }}
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,19,34,0.6)_0%,rgba(14,19,34,0.8)_100%)]" />
    <div
      className="relative z-10 flex h-full w-full overflow-y-auto"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 1rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)",
      }}
    >
      <div className="m-auto flex w-full max-w-md flex-col gap-5 px-5 sm:max-w-lg sm:px-6 md:max-w-xl md:gap-6 md:px-8 lg:max-w-2xl">
        <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">Статистика</h2>
        <div className="space-y-2 rounded-2xl border border-[#e5e7ee2a] bg-[#202b47c2] p-4 text-sm text-soft backdrop-blur-sm md:p-6 md:text-base">
          <p>Лучший счёт: {progress.bestScore}</p>
          <p>Всего раундов: {progress.totalRounds}</p>
          <p>Всего поймано: {progress.totalCaught}</p>
          <p>Чаще всего ты выбираешь: {topBucketLabel(progress)}</p>
          <p>
            Общий расклад: Сделать {progress.bucketTotals.do} · Сохранить{" "}
            {progress.bucketTotals.save} · Отпустить {progress.bucketTotals.release}
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-2xl border border-[#e5e7ee2a] bg-[#202b47c2] px-4 py-3 text-mist transition hover:bg-[#27345add] md:py-4"
        >
          Назад
        </button>
      </div>
    </div>
  </section>
);
