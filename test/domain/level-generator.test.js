import test from "node:test";
import assert from "node:assert/strict";

import {
  LevelGenerator,
  isLevelSolvable,
} from "../../src/domain/level-generator.js";

function seededRandom(seed) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}

test("gera uma fase aleatória com obstáculos que sempre pode ser resolvida", () => {
  const generator = new LevelGenerator({
    width: 8,
    height: 8,
    random: seededRandom(42),
  });

  const level = generator.generate(3);
  const occupied = [level.player, level.box, level.hole, ...level.obstacles];
  const uniquePositions = new Set(occupied.map(({ x, y }) => `${x},${y}`));

  assert.equal(level.width, 8);
  assert.equal(level.height, 8);
  assert.ok(level.obstacles.length >= 10);
  assert.equal(uniquePositions.size, occupied.length);
  assert.equal(isLevelSolvable(level), true);
});

