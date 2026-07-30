import test from "node:test";
import assert from "node:assert/strict";

import {
  cameraTrainingProgress,
  hasEnoughCameraSamples,
} from "../../src/application/camera-training-progress.js";

test("libera o treinamento somente com dez exemplos em cada direção", () => {
  assert.equal(hasEnoughCameraSamples([10, 10, 9, 10]), false);
  assert.equal(hasEnoughCameraSamples([10, 12, 10, 15]), true);
  assert.equal(cameraTrainingProgress([5, 10, 0, 15]), 63);
});

