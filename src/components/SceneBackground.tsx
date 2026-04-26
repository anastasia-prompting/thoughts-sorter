import { CSSProperties } from "react";
import { sceneBackgrounds } from "../theme/visualAssets";

interface SceneBackgroundProps {
  animationsEnabled: boolean;
}

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: `particle-${index}`,
  x: 5 + ((index * 13) % 86),
  y: 8 + ((index * 17) % 78),
  size: 1.4 + (index % 4) * 0.6,
  delay: (index % 9) * 0.8,
  duration: 9 + (index % 6) * 2.2,
}));

export const SceneBackground = ({ animationsEnabled }: SceneBackgroundProps) => (
  <div
    className={`scene-bg pointer-events-none absolute inset-0 overflow-hidden ${
      animationsEnabled ? "scene-bg--animated" : ""
    }`}
  >
    <div className="scene-bg__base" />
    <div
      className="scene-bg__art"
      style={{ backgroundImage: `url(${sceneBackgrounds.roundMain})` }}
    />
    <div className="scene-bg__readable-zone" />
    {particles.map((particle) => (
      <span
        key={particle.id}
        className={`scene-bg__particle ${animationsEnabled ? "scene-bg__particle--animated" : ""}`}
        style={
          {
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          } as CSSProperties
        }
      />
    ))}
  </div>
);
