interface TopHUDProps {
  score: number;
  timeLeft: number;
  combo: number;
  onPause: () => void;
}

export const TopHUD = ({ score, timeLeft, combo, onPause }: TopHUDProps) => (
  <header className="flex items-center justify-between gap-3 rounded-2xl border border-[#e5e7ee2c] bg-[#0d1426d9] px-3 py-2.5 shadow-[0_14px_28px_rgba(8,11,22,0.5)] backdrop-blur-md md:px-5 md:py-3">
    <div className="text-xs text-soft md:text-sm">
      <div>Счёт</div>
      <div className="text-lg font-semibold text-mist md:text-xl">{score}</div>
    </div>
    <div className="text-center text-xs text-soft md:text-sm">
      <div>Время</div>
      <div className="text-lg font-semibold text-mist md:text-xl">{timeLeft}</div>
    </div>
    <div className="text-xs text-soft md:text-sm">
      <div>Комбо</div>
      <div className="text-lg font-semibold text-mist md:text-xl">{combo}</div>
    </div>
    <button
      type="button"
      onClick={onPause}
      className="rounded-xl border border-[#e5e7ee2f] bg-mist/10 px-3 py-2 text-sm text-mist transition hover:bg-mist/20 md:px-4 md:py-2.5"
    >
      Пауза
    </button>
  </header>
);
