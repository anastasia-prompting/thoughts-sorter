import { CSSProperties } from "react";
import { SpawnedThought } from "../types";
import { thoughtBucketTints } from "../theme/moonObservatory";
import { bubbleMotionFromId } from "../utils/motion";
import { bubbleSprites } from "../theme/visualAssets";

interface ThoughtBubbleProps {
  thought: SpawnedThought;
  phase: "spawn" | "idle" | "caught" | "escape";
  animationsEnabled: boolean;
  onCatch: () => void;
}

export const ThoughtBubble = ({
  thought,
  phase,
  animationsEnabled,
  onCatch,
}: ThoughtBubbleProps) => {
  const motion = bubbleMotionFromId(thought.id);
  const spriteIndex =
    thought.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % bubbleSprites.length;
  const sprite = bubbleSprites[spriteIndex];

  return (
    <button
      type="button"
      onClick={onCatch}
      className={`thought-bubble thought-bubble--${phase} ${
        animationsEnabled ? "thought-bubble--animated" : ""
      }`}
      style={
        {
          left: `${thought.x}%`,
          top: `${thought.y}%`,
          "--drift-x": `${motion.driftX}px`,
          "--drift-y": `${motion.driftY}px`,
          "--float-amplitude": `${motion.floatAmplitude}px`,
          "--rotate-deg": `${motion.rotateDeg}deg`,
          "--cycle-seconds": `${motion.cycleSeconds}s`,
          "--drift-delay": `${motion.delaySeconds}s`,
          "--bubble-tint": thoughtBucketTints[thought.correctBucket],
        } as CSSProperties
      }
    >
      <img
        className="thought-bubble__art"
        src={sprite}
        alt=""
        aria-hidden="true"
        draggable={false}
      />
      <span className="thought-bubble__text">{thought.text}</span>
    </button>
  );
};
