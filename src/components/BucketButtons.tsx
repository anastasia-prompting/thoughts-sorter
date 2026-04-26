import { Bucket } from "../types";

interface BucketButtonsProps {
  disabled: boolean;
  onPick: (bucket: Bucket) => void;
}

const buckets: { key: Bucket; title: string; subtitle: string; classes: string }[] = [
  {
    key: "do",
    title: "Сделать",
    subtitle: "То, за чем стоит действие",
    classes:
      "border border-[#e5e7ee30] bg-[linear-gradient(145deg,rgba(122,136,217,0.78),rgba(82,96,178,0.55))] hover:bg-[linear-gradient(145deg,rgba(132,146,225,0.86),rgba(92,106,188,0.62))]",
  },
  {
    key: "save",
    title: "Сохранить",
    subtitle: "То, что жалко потерять",
    classes:
      "border border-[#e5e7ee2a] bg-[linear-gradient(145deg,rgba(141,187,163,0.66),rgba(96,142,118,0.5))] hover:bg-[linear-gradient(145deg,rgba(151,197,173,0.74),rgba(106,152,128,0.58))]",
  },
  {
    key: "release",
    title: "Отпустить",
    subtitle: "То, что не нужно тащить дальше",
    classes:
      "border border-[#e5e7ee2a] bg-[linear-gradient(145deg,rgba(178,158,203,0.7),rgba(133,113,158,0.5))] hover:bg-[linear-gradient(145deg,rgba(188,168,213,0.78),rgba(143,123,168,0.58))]",
  },
];

export const BucketButtons = ({ disabled, onPick }: BucketButtonsProps) => (
  <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-3">
    {buckets.map((bucket) => (
      <button
        key={bucket.key}
        type="button"
        disabled={disabled}
        onClick={() => onPick(bucket.key)}
        className={`rounded-2xl px-3 py-3 text-left text-mist shadow-[0_10px_22px_rgba(8,11,22,0.42)] backdrop-blur-md transition disabled:cursor-not-allowed disabled:opacity-40 md:px-4 md:py-4 ${bucket.classes}`}
      >
        <div className="text-sm font-semibold md:text-base">{bucket.title}</div>
        <div className="text-xs text-soft md:text-sm">{bucket.subtitle}</div>
      </button>
    ))}
  </div>
);
