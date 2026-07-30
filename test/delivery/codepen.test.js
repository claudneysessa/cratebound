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

