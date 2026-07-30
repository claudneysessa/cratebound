export const REQUIRED_CAMERA_SAMPLES = 10;

export function hasEnoughCameraSamples(
  counts,
  required = REQUIRED_CAMERA_SAMPLES,
) {
  return counts.length === 4 && counts.every((count) => count >= required);
}

export function cameraTrainingProgress(
  counts,
  required = REQUIRED_CAMERA_SAMPLES,
) {
  const collected = counts.reduce(
    (total, count) => total + Math.min(count, required),
    0,
  );
  return Math.round((collected / (required * 4)) * 100);
}

