import { sceneBackgrounds } from "../theme/visualAssets";

interface TutorialScreenProps {
  onStart: () => void;
  onBack: () => void;
}

const cards = [
  { title: "Поймай мысль", text: "Тапни по ней, пока она не исчезла." },
  {
    title: "Выбери категорию",
    text: "Отправь мысль в «Сделать», «Сохранить» или «Отпустить».",
  },
  { title: "Собери порядок", text: "У тебя есть 60 секунд на один раунд." },
];

export const TutorialScreen = ({ onStart, onBack }: TutorialScreenProps) => (
  <section className="relative h-[100dvh] w-full overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${sceneBackgrounds.start})` }}
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,19,34,0.55)_0%,rgba(14,19,34,0.78)_100%)]" />
    <div
      className="relative z-10 flex h-full w-full overflow-y-auto"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 1rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)",
      }}
    >
      <div className="m-auto flex w-full max-w-md flex-col gap-5 px-5 sm:max-w-lg sm:px-6 md:max-w-xl md:gap-6 md:px-8 lg:max-w-2xl">
        <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">Как играть</h2>
        <div className="space-y-3 md:grid md:grid-cols-3 md:gap-3 md:space-y-0">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-[#e5e7ee29] bg-[#1e2740c4] p-4 backdrop-blur-sm md:p-5"
            >
              <h3 className="font-semibold text-mist">{card.title}</h3>
              <p className="text-sm text-soft md:mt-1">{card.text}</p>
            </article>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            className="w-full rounded-2xl border border-[#e5e7ee2d] bg-[#202c48c8] px-4 py-3 text-mist transition hover:bg-[#283457dc] md:py-4"
          >
            Назад
          </button>
          <button
            type="button"
            onClick={onStart}
            className="w-full rounded-2xl border border-[#e5e7ee3d] bg-[linear-gradient(145deg,rgba(122,136,217,0.7),rgba(122,136,217,0.46))] px-4 py-3 font-semibold text-mist transition hover:brightness-105 md:py-4"
          >
            Начать раунд
          </button>
        </div>
      </div>
    </div>
  </section>
);
