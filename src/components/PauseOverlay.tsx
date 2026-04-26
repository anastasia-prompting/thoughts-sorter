interface PauseOverlayProps {
  onContinue: () => void;
}

export const PauseOverlay = ({ onContinue }: PauseOverlayProps) => (
  <div className="fixed inset-0 z-30 flex items-center justify-center bg-ink/72 p-4 backdrop-blur-sm">
    <div className="w-full max-w-sm rounded-3xl border border-[#e5e7ee2a] bg-[#1a2238e6] p-6 text-center shadow-glow md:max-w-md md:p-8">
      <h2 className="text-2xl font-semibold md:text-3xl">Пауза</h2>
      <p className="mt-2 text-soft">Ещё чуть-чуть</p>
      <button
        type="button"
        onClick={onContinue}
        className="mt-5 w-full rounded-2xl border border-[#e5e7ee44] bg-[linear-gradient(145deg,rgba(122,136,217,0.7),rgba(122,136,217,0.46))] px-4 py-3 font-semibold text-mist transition hover:brightness-105 md:py-4"
      >
        Продолжить
      </button>
    </div>
  </div>
);
