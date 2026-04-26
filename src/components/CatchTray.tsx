import { SpawnedThought } from "../types";

interface CatchTrayProps {
  thought: SpawnedThought | null;
}

export const CatchTray = ({ thought }: CatchTrayProps) => (
  <section className="min-h-[5rem] rounded-2xl border border-[#e5e7ee2c] bg-[#0d1426d9] p-3 shadow-[0_12px_24px_rgba(8,11,22,0.5)] backdrop-blur-md md:p-4">
    <p className="text-xs uppercase tracking-wide text-soft/80 md:text-sm">Лоток</p>
    {thought ? (
      <div className="mt-2 rounded-xl border border-[#e5e7ee35] bg-mist/15 px-3 py-2 text-mist md:text-base">
        {thought.text}
      </div>
    ) : (
      <div className="mt-2 rounded-xl border border-dashed border-soft/30 px-3 py-2 text-sm text-soft/80 md:text-base">
        Поймай мысль, чтобы разложить её
      </div>
    )}
  </section>
);
