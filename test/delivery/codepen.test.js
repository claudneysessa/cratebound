import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("a entrega do CodePen usa apenas JavaScript clássico", async () => {
  const javascript = await readFile(
    new URL("../../codepen/javascript.js", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(javascript, /^\s*(import|export)\s/m);
});

test("a entrega do CodePen inclui câmera e transferência de aprendizado", async () => {
  const html = await readFile(
    new URL("../../codepen/html.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /tensorflow\/tfjs/);
  assert.match(html, /tensorflow-models\/mobilenet/);
  assert.match(html, /<video[^>]+data-webcam/);
  assert.match(html, /data-camera-start/);
  assert.match(html, /data-camera-train/);
  assert.equal((html.match(/data-sample=/g) ?? []).length, 4);
});

test("o painel de treino fica ao lado da área do tabuleiro", async () => {
  const html = await readFile(
    new URL("../../codepen/html.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /class="play-area"/);
  assert.match(html, /class="board-column"/);
});
