import { useEffect, useMemo, useRef, useState } from "react";
import { GamePace, SpawnedThought } from "../types";
import { THOUGHT_EXIT_MS, THOUGHT_SPAWN_MS } from "../utils/motion";
import { thoughtTimeoutMs } from "../utils/thoughts";
import { NPCCloudMoth } from "./NPCCloudMoth";
import { SceneBackground } from "./SceneBackground";
import { ThoughtBubble } from "./ThoughtBubble";

interface ThoughtFieldProps {
  thoughts: SpawnedThought[];
  gamePace: GamePace;
  combo: number;
  animationsEnabled: boolean;
  onCatch: (id: string) => void;
  onTimeout: (id: string) => void;
}

type ThoughtPhase = "spawn" | "idle" | "caught" | "escape";

export const ThoughtField = ({
  thoughts,
  gamePace,
  combo,
  animationsEnabled,
  onCatch,
  onTimeout,
}: ThoughtFieldProps) => {
  const [phases, setPhases] = useState<Record<string, ThoughtPhase>>({});
  const knownRef = useRef<Set<string>>(new Set());
  const pendingRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const activeIds = new Set(thoughts.map((thought) => thought.id));

    thoughts.forEach((thought) => {
      if (knownRef.current.has(thought.id)) return;
      knownRef.current.add(thought.id);
      setPhases((prev) => ({ ...prev, [thought.id]: animationsEnabled ? "spawn" : "idle" }));
      if (animationsEnabled) {
        window.setTimeout(() => {
          setPhases((prev) => (prev[thought.id] ? { ...prev, [thought.id]: "idle" } : prev));
        }, THOUGHT_SPAWN_MS);
      }
    });

    knownRef.current.forEach((id) => {
      if (activeIds.has(id)) return;
      knownRef.current.delete(id);
      pendingRef.current.delete(id);
    });

    setPhases((prev) => {
      const next: Record<string, ThoughtPhase> = {};
      Object.entries(prev).forEach(([id, phase]) => {
        if (activeIds.has(id)) next[id] = phase;
      });
      return next;
    });
  }, [animationsEnabled, thoughts]);

  useEffect(() => {
    const timers = thoughts.map((thought) =>
      window.setTimeout(() => {
        if (pendingRef.current.has(thought.id)) return;
        pendingRef.current.add(thought.id);
        setPhases((prev) => ({ ...prev, [thought.id]: animationsEnabled ? "escape" : "idle" }));
        window.setTimeout(() => onTimeout(thought.id), animationsEnabled ? THOUGHT_EXIT_MS : 0);
      }, thoughtTimeoutMs(thought, gamePace)),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [animationsEnabled, gamePace, onTimeout, thoughts]);

  const visibleThoughts = useMemo(
    () => thoughts.filter((thought) => phases[thought.id]),
    [phases, thoughts],
  );

  const handleCatch = (thoughtId: string) => {
    if (pendingRef.current.has(thoughtId)) return;
    pendingRef.current.add(thoughtId);
    setPhases((prev) => ({ ...prev, [thoughtId]: animationsEnabled ? "caught" : "idle" }));
    window.setTimeout(() => onCatch(thoughtId), animationsEnabled ? THOUGHT_EXIT_MS : 0);
  };

  return (
    <div className="thought-field absolute inset-0 overflow-hidden">
      <SceneBackground animationsEnabled={animationsEnabled} />
      <div className="thought-field__play-area">
        <NPCCloudMoth
          combo={combo}
          thoughtCount={visibleThoughts.length}
          animationsEnabled={animationsEnabled}
        />
        {visibleThoughts.map((thought) => (
          <ThoughtBubble
            key={thought.id}
            thought={thought}
            phase={phases[thought.id] ?? "idle"}
            animationsEnabled={animationsEnabled}
            onCatch={() => handleCatch(thought.id)}
          />
        ))}
      </div>
    </div>
  );
};
