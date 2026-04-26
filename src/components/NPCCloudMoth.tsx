import { npcSprites } from "../theme/visualAssets";

interface NPCCloudMothProps {
  combo: number;
  thoughtCount: number;
  animationsEnabled: boolean;
}

export const NPCCloudMoth = ({ combo, thoughtCount, animationsEnabled }: NPCCloudMothProps) => {
  const isComboReacting = combo >= 3;
  const isCurious = thoughtCount > 0;
  const npcImage = isComboReacting
    ? npcSprites.glow
    : isCurious
      ? npcSprites.blink
      : npcSprites.idle;

  return (
    <img
      className={`npc-cloud-moth ${animationsEnabled ? "npc-cloud-moth--animated" : ""} ${
        isComboReacting ? "npc-cloud-moth--combo" : ""
      } ${isCurious ? "npc-cloud-moth--curious" : ""}`}
      src={npcImage}
      alt=""
      aria-hidden="true"
      loading="eager"
      decoding="async"
      draggable={false}
    />
  );
};
