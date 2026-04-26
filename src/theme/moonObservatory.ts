import { Bucket } from "../types";

export const moonObservatoryColors = {
  deepIndigo: "#3F4A67",
  silverFog: "#A9B3C2",
  paleLilac: "#B9B0C9",
  moonlight: "#E5E7EE",
  fadedCloudTeal: "#93A9B0",
  quietGlow: "#D8C8A8",
} as const;

export const thoughtBucketTints: Record<Bucket, string> = {
  do: "rgba(216, 200, 168, 0.23)",
  save: "rgba(147, 169, 176, 0.24)",
  release: "rgba(185, 176, 201, 0.24)",
};
