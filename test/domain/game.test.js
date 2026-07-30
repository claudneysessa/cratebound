import test from "node:test";
import assert from "node:assert/strict";

import { Game } from "../../src/domain/game.js";

test("empurra a caixa para o buraco e vence", () => {
  const game = new Game({
    player: { x: 0, y: 0 },
    box: { x: 1, y: 0 },
    hole: { x: 2, y: 0 },
  });

  game.move("right");

  assert.deepEqual(game.player, { x: 1, y: 0 });
  assert.deepEqual(game.box, { x: 2, y: 0 });
  assert.equal(game.hasWon, true);
});

test("impede o jogador de sair dos limites da sala", () => {
  const game = new Game({
    width: 3,
    height: 3,
    player: { x: 0, y: 0 },
    box: { x: 1, y: 1 },
    hole: { x: 2, y: 2 },
  });

  game.move("left");
  game.move("up");

  assert.deepEqual(game.player, { x: 0, y: 0 });
});

test("impede jogador e caixa de atravessarem obstáculos", () => {
  const game = new Game({
    width: 4,
    height: 3,
    player: { x: 0, y: 1 },
    box: { x: 1, y: 1 },
    hole: { x: 3, y: 1 },
    obstacles: [{ x: 2, y: 1 }],
  });

  game.move("right");

  assert.deepEqual(game.player, { x: 0, y: 1 });
  assert.deepEqual(game.box, { x: 1, y: 1 });
});
