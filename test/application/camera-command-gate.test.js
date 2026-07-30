import test from "node:test";
import assert from "node:assert/strict";

import { CameraCommandGate } from "../../src/application/camera-command-gate.js";

test("libera apenas previsões confiáveis, estáveis e espaçadas", () => {
  const gate = new CameraCommandGate({
    minimumConfidence: 0.8,
    stablePredictions: 3,
    intervalMs: 400,
  });

  assert.equal(gate.accept("left", 0.95, 0), null);
  assert.equal(gate.accept("left", 0.95, 20), null);
  assert.equal(gate.accept("left", 0.95, 40), "left");
  assert.equal(gate.accept("left", 0.95, 100), null);
  assert.equal(gate.accept("right", 0.6, 500), null);
  assert.equal(gate.accept("right", 0.95, 520), null);
  assert.equal(gate.accept("right", 0.95, 540), null);
  assert.equal(gate.accept("right", 0.95, 560), "right");
});

test("os padrões aceitam duas previsões com sessenta por cento", () => {
  const gate = new CameraCommandGate();

  assert.equal(gate.accept("up", 0.6, 0), null);
  assert.equal(gate.accept("up", 0.6, 20), "up");
});
