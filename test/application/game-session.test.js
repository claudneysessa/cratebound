import test from "node:test";
import assert from "node:assert/strict";

import { GameSession } from "../../src/application/game-session.js";

const initialLevel = {
  player: { x: 0, y: 0 },
  box: { x: 1, y: 0 },
  hole: { x: 2, y: 0 },
};

test("reinicia a partida e publica o estado inicial", () => {
  const publishedStates = [];
  const session = new GameSession(initialLevel, (state) => {
    publishedStates.push(state);
  });

  session.move("right");
  session.reset();

  assert.deepEqual(publishedStates.at(-1), {
    width: Infinity,
    height: Infinity,
    player: { x: 0, y: 0 },
    box: { x: 1, y: 0 },
    hole: { x: 2, y: 0 },
    obstacles: [],
    hasWon: false,
    stage: 1,
  });
});

test("carrega uma nova fase depois da vitória", () => {
  const nextLevel = {
    width: 5,
    height: 5,
    player: { x: 0, y: 4 },
    box: { x: 2, y: 2 },
    hole: { x: 4, y: 0 },
    obstacles: [{ x: 1, y: 1 }],
  };
  const publishedStates = [];
  const requestedStages = [];
  const session = new GameSession(
    initialLevel,
    (state) => publishedStates.push(state),
    {
      nextLevel: (stage) => {
        requestedStages.push(stage);
        return nextLevel;
      },
      schedule: (action) => action(),
    },
  );

  session.move("right");

  assert.equal(publishedStates.some((state) => state.hasWon), true);
  assert.deepEqual(requestedStages, [2]);
  assert.deepEqual(publishedStates.at(-1).player, nextLevel.player);
  assert.equal(publishedStates.at(-1).stage, 2);
});
