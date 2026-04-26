import { useEffect, useRef } from "react";

interface UseRoundLoopParams {
  isRunning: boolean;
  onTick: () => void;
  onSpawn: () => void;
  getNextSpawnDelay: () => number;
}

export const useRoundLoop = ({
  isRunning,
  onTick,
  onSpawn,
  getNextSpawnDelay,
}: UseRoundLoopParams) => {
  const spawnTimeoutRef = useRef<number | null>(null);
  const onTickRef = useRef(onTick);
  const onSpawnRef = useRef(onSpawn);
  const getNextSpawnDelayRef = useRef(getNextSpawnDelay);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    onSpawnRef.current = onSpawn;
  }, [onSpawn]);

  useEffect(() => {
    getNextSpawnDelayRef.current = getNextSpawnDelay;
  }, [getNextSpawnDelay]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => onTickRef.current(), 1000);
    return () => window.clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    const schedule = () => {
      spawnTimeoutRef.current = window.setTimeout(() => {
        onSpawnRef.current();
        schedule();
      }, getNextSpawnDelayRef.current());
    };
    schedule();
    return () => {
      if (spawnTimeoutRef.current) window.clearTimeout(spawnTimeoutRef.current);
    };
  }, [isRunning]);
};
