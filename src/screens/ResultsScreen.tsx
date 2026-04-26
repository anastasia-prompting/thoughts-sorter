import { RoundResult } from "../types";
import { sceneBackgrounds } from "../theme/visualAssets";

interface ResultsScreenProps {
  result: RoundResult;
  onRetry: () => void;
  onStats: () => void;
  onHome: () => void;
}

export const ResultsScreen = ({ result, onRetry, onStats, onHome }: ResultsScreenProps) => (
  <section className="relative h-[100dvh] w-full overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${sceneBackgrounds.results})` }}
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,19,34,0.55)_0%,rgba(14,19,34,0.78)_100%)]" />
    <div
      className="relative z-10 flex h-full w-full overflow-y-auto"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 1rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)",
      }}
    >
      <div className="m-auto flex w-full max-w-md flex-col gap-5 px-5 sm:max-w-lg sm:px-6 md:max-w-2xl md:gap-6 md:px-8 lg:max-w-3xl">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">Раунд завершён</h2>
          <p className="text-soft md:text-lg">{result.phrase}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm sm:gap-3 md:grid-cols-4 md:text-base">
          <div className="rounded-xl border border-[#e5e7ee2a] bg-[#202b47c2] p-3 backdrop-blur-sm md:p-4">
            <div className="text-soft">Итоговый счёт</div>
            <div className="text-xl font-semibold text-mist md:text-2xl">{result.score}</div>
          </div>
          <div className="rounded-xl border border-[#e5e7ee2a] bg-[#202b47c2] p-3 backdrop-blur-sm md:p-4">
            <div className="text-soft">Лучшая серия</div>
            <div className="text-xl font-semibold text-mist md:text-2xl">{result.bestCombo}</div>
          </div>
          <div className="rounded-xl border border-[#e5e7ee2a] bg-[#202b47c2] p-3 backdrop-blur-sm md:p-4">
            <div className="text-soft">Поймано мыслей</div>
            <div className="text-xl font-semibold text-mist md:text-2xl">{result.caught}</div>
          </div>
          <div className="rounded-xl border border-[#e5e7ee2a] bg-[#202b47c2] p-3 backdrop-blur-sm md:p-4">
            <div className="text-soft">Пропущено</div>
            <div className="text-xl font-semibold text-mist md:text-2xl">{result.missed}</div>
          </div>
        </div>
        <div className="rounded-2xl border border-[#e5e7ee2a] bg-[#202b47c2] p-3 text-sm text-soft backdrop-blur-sm md:p-4 md:text-base">
          Расклад: Сделать {result.byBucket.do} · Сохранить {result.byBucket.save} · Отпустить{" "}
          {result.byBucket.release}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onRetry}
            className="w-full rounded-2xl border border-[#e5e7ee40] bg-[linear-gradient(145deg,rgba(122,136,217,0.7),rgba(122,136,217,0.46))] px-4 py-3 font-semibold text-mist transition hover:brightness-105 md:py-4"
          >
            Ещё раунд
          </button>
          <button
            type="button"
            onClick={onStats}
            className="w-full rounded-2xl border border-[#e5e7ee2a] bg-[#202b47c2] px-4 py-3 text-mist transition hover:bg-[#27345add] md:py-4"
          >
            Статистика
          </button>
          <button
            type="button"
            onClick={onHome}
            className="w-full rounded-2xl border border-[#e5e7ee2a] bg-[#202b47c2] px-4 py-3 text-mist transition hover:bg-[#27345add] md:py-4"
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  </section>
);
