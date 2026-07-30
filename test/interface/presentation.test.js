import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("exibe autoria e contexto acadêmico no rodapé", async () => {
  const html = await readFile(
    new URL("../../index.html", import.meta.url),
    "utf8",
  );
  const css = await readFile(
    new URL("../../styles.css", import.meta.url),
    "utf8",
  );

  assert.match(html, /<footer class="credits">/);
  assert.match(html, /Powered by <strong>Claudney Sarti Sessa<\/strong>/);
  assert.match(
    html,
    /Projeto desenvolvido para o curso de Engenharia de Software com IA Aplicada/,
  );
  assert.match(html, /UNIPDS/);
  assert.match(css, /\.credits\s*{/);
});

test("mantém jogo e câmera compactos dentro do navegador", async () => {
  const css = await readFile(
    new URL("../../styles.css", import.meta.url),
    "utf8",
  );

  assert.match(
    css,
    /@media \(max-width: 1040px\)[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+minmax\(140px,\s*\.72fr\)/,
  );
  assert.match(
    css,
    /@media \(max-width: 560px\)[\s\S]*\.board\s*{[^}]*max-height:\s*52vh/,
  );
  assert.doesNotMatch(
    css,
    /@media \(max-width: 1040px\)[\s\S]*\.play-area\s*{\s*grid-template-columns:\s*1fr;/,
  );
  assert.match(
    css,
    /@media \(max-height: 900px\) and \(min-width: 1041px\)[\s\S]*\.board\s*{[^}]*max-height:\s*calc\(100vh - 360px\)/,
  );
  assert.match(
    css,
    /@media \(max-height: 900px\) and \(min-width: 1041px\)[\s\S]*\[data-webcam\]\s*{\s*max-height:\s*16vh;/,
  );
});

test("usa mídias próprias para a vitrine do GitHub sem duplicar o GIF", async () => {
  const readme = await readFile(
    new URL("../../README.md", import.meta.url),
    "utf8",
  );

  assert.match(readme, /docs\/assets\/cratebound-hero\.png/);
  assert.match(readme, /docs\/assets\/cratebound-gameplay\.gif/);
  assert.match(readme, /docs\/assets\/cratebound-mobile\.png/);
  assert.equal(
    readme.match(/docs\/assets\/cratebound-gameplay\.gif/g)?.length,
    1,
  );
  assert.doesNotMatch(readme, /docs\/assets\/gameplay\.gif/);
});
