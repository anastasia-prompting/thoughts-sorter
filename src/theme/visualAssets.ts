import bgStart from "../assets/moon-observatory/bg-start.webp";
import bgRoundMain from "../assets/moon-observatory/bg-round-main.webp";
import bgResults from "../assets/moon-observatory/bg-results.webp";

import npcIdle from "../assets/moon-observatory/npc/npc-cloud-moth-idle.png";
import npcBlink from "../assets/moon-observatory/npc/npc-cloud-moth-blink.png";
import npcGlow from "../assets/moon-observatory/npc/npc-cloud-moth-glow.png";

import bubble01 from "../assets/moon-observatory/bubbles/bubble-01.png";
import bubble02 from "../assets/moon-observatory/bubbles/bubble-02.png";
import bubble03 from "../assets/moon-observatory/bubbles/bubble-03.png";
import bubble04 from "../assets/moon-observatory/bubbles/bubble-04.png";

export const sceneBackgrounds = {
  start: bgStart,
  roundMain: bgRoundMain,
  results: bgResults,
} as const;

export const npcSprites = {
  idle: npcIdle,
  blink: npcBlink,
  glow: npcGlow,
} as const;

export const bubbleSprites = [bubble01, bubble02, bubble03, bubble04] as const;
