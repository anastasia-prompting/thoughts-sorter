const DRIFT_X = [9, -11, 13, -8, 10, -12, 7];
const DRIFT_Y = [-6, 7, -9, 5, -8, 6, -4];
const FLOAT = [4.2, 4.8, 5.3, 5.9, 6.4, 4.6];
const ROTATION = [2.2, -2.7, 3.1, -2, 2.6, -1.6];
const SPEED = [17, 19, 21, 23, 25, 27];
const WARP = [
  "46% 54% 51% 49% / 45% 43% 57% 55%",
  "52% 48% 44% 56% / 48% 54% 46% 52%",
  "43% 57% 55% 45% / 53% 42% 58% 47%",
  "50% 50% 58% 42% / 44% 52% 48% 56%",
];

const hashFromId = (id: string): number => {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const bubbleMotionFromId = (id: string) => {
  const seed = hashFromId(id);
  return {
    driftX: DRIFT_X[seed % DRIFT_X.length],
    driftY: DRIFT_Y[seed % DRIFT_Y.length],
    floatAmplitude: FLOAT[seed % FLOAT.length],
    rotateDeg: ROTATION[seed % ROTATION.length],
    cycleSeconds: SPEED[seed % SPEED.length],
    delaySeconds: (seed % 8) * 0.23,
    warpShape: WARP[seed % WARP.length],
    glowX: 18 + (seed % 42),
    glowY: 16 + ((seed >> 3) % 32),
  };
};

export const THOUGHT_SPAWN_MS = 560;
export const THOUGHT_EXIT_MS = 500;
