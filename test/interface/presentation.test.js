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
