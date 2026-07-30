import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("a entrega do CodePen usa apenas JavaScript clássico", async () => {
  const javascript = await readFile(
    new URL("../../codepen/script.js", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(javascript, /^\s*(import|export)\s/m);
});

test("a entrega do CodePen inclui câmera e transferência de aprendizado", async () => {
  const html = await readFile(
    new URL("../../codepen/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /tensorflow\/tfjs/);
  assert.match(html, /tensorflow-models\/mobilenet/);
  assert.match(html, /href="\.\/style\.css"/);
  assert.match(html, /src="\.\/script\.js"/);
  assert.match(html, /<video[^>]+data-webcam/);
  assert.match(html, /data-camera-start/);
  assert.match(html, /data-camera-train/);
  assert.equal((html.match(/data-sample=/g) ?? []).length, 4);
});

test("o painel de treino fica ao lado da área do tabuleiro", async () => {
  const html = await readFile(
    new URL("../../codepen/index.html", import.meta.url),
    "utf8",
  );
  const css = await readFile(
    new URL("../../codepen/style.css", import.meta.url),
    "utf8",
  );

  assert.match(html, /class="play-area"/);
  assert.match(html, /class="board-column"/);
  assert.match(css, /\.play-area\s*{[^}]*border:/s);
  assert.match(css, /\.camera-panel\s*{[^}]*border-left:/s);
});

test("o painel permite iniciar um novo treinamento", async () => {
  const html = await readFile(
    new URL("../../codepen/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /data-camera-reset/);
  assert.match(html, />Novo treinamento</);
});
