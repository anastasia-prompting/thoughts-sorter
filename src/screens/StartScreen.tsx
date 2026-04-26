import { sceneBackgrounds } from "../theme/visualAssets";

interface StartScreenProps {
  onStart: () => void;
  onTutorial: () => void;
  onSettings: () => void;
}

export const StartScreen = ({ onStart, onTutorial, onSettings }: StartScreenProps) => (
  <section className="relative h-[100dvh] w-full overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${sceneBackgrounds.start})` }}
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,18,32,0.42)_0%,rgba(12,18,32,0.6)_56%,rgba(12,18,32,0.82)_100%)]" />
    <div
      className="relative z-10 flex h-full w-full overflow-y-auto"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 1rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)",
      }}
    >
      <div className="m-auto flex w-full max-w-md flex-col gap-8 px-5 sm:max-w-lg sm:px-6 md:max-w-xl md:gap-10 md:px-8 lg:max-w-2xl lg:gap-12">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onSettings}
            className="rounded-xl border border-[#e5e7ee33] bg-[#1f2740c4] px-3 py-2 text-sm text-mist transition hover:bg-[#283352db]"
          >
            Настройки
          </button>
        </div>
        <div className="space-y-3 md:space-y-4">
          <h1 className="text-4xl font-semibold leading-tight text-mist md:text-5xl lg:text-6xl">
            Потерянные мысли
          </h1>
          <p className="max-w-sm text-soft md:max-w-md md:text-lg">
            Лови мысли, пока они не исчезли.
            <br />
            Решай, что с ними делать: сделать, сохранить или отпустить.
          </p>
        </div>
        <div className="space-y-3">
          <button
            type="button"
            onClick={onStart}
            className="w-full rounded-2xl border border-[#e5e7ee44] bg-[linear-gradient(145deg,rgba(122,136,217,0.72),rgba(122,136,217,0.5))] px-4 py-3 text-lg font-semibold text-mist shadow-[0_12px_24px_rgba(12,18,34,0.35)] transition hover:brightness-105 md:py-4 md:text-xl"
          >
            Начать
          </button>
          <button
            type="button"
            onClick={onTutorial}
            className="w-full rounded-2xl border border-[#e5e7ee2e] bg-[#202b45c7] px-4 py-3 text-mist transition hover:bg-[#273457da] md:py-4"
          >
            Как играть
          </button>
        </div>
      </div>
    </div>
  </section>
);
