export class CameraCommandGate {
  constructor({
    minimumConfidence = 0.6,
    stablePredictions = 2,
    intervalMs = 400,
  } = {}) {
    this.minimumConfidence = minimumConfidence;
    this.stablePredictions = stablePredictions;
    this.intervalMs = intervalMs;
    this.lastDirection = null;
    this.repetitions = 0;
    this.lastMovementAt = -Infinity;
  }

  accept(direction, confidence, now = Date.now()) {
    if (confidence < this.minimumConfidence) {
      this.lastDirection = null;
      this.repetitions = 0;
      return null;
    }

    if (direction === this.lastDirection) {
      this.repetitions += 1;
    } else {
      this.lastDirection = direction;
      this.repetitions = 1;
    }

    if (
      this.repetitions < this.stablePredictions ||
      now - this.lastMovementAt < this.intervalMs
    ) {
      return null;
    }

    this.lastMovementAt = now;
    this.repetitions = 0;
    return direction;
  }
}
