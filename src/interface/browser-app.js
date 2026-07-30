import { GameSession } from "../application/game-session.js";
import { LevelGenerator } from "../domain/level-generator.js";

const generator = new LevelGenerator();
const board = document.querySelector("[data-board]");
const status = document.querySelector("[data-status]");
const stageLabel = document.querySelector("[data-stage]");

function prepareBoard(state) {
  const expectedCells = state.width * state.height;
  if (board.children.length === expectedCells) return;

  board.replaceChildren();
  board.style.setProperty("--columns", state.width);

  for (let y = 0; y < state.height; y += 1) {
    for (let x = 0; x < state.width; x += 1) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.x = x;
      cell.dataset.y = y;
      board.append(cell);
    }
  }
}

function cellAt(position) {
  return board.querySelector(
    `[data-x="${position.x}"][data-y="${position.y}"]`,
  );
}

function render(state) {
  prepareBoard(state);

  board.querySelectorAll(".player, .box, .hole, .obstacle").forEach((cell) => {
    cell.classList.remove("player", "box", "hole", "obstacle");
    cell.removeAttribute("aria-label");
  });

  state.obstacles.forEach((position) => {
    const cell = cellAt(position);
    cell?.classList.add("obstacle");
    cell?.setAttribute("aria-label", "Obstáculo");
  });

  const holeCell = cellAt(state.hole);
  const boxCell = cellAt(state.box);
  const playerCell = cellAt(state.player);

  holeCell?.classList.add("hole");
  boxCell?.classList.add("box");
  playerCell?.classList.add("player");

  holeCell?.setAttribute("aria-label", "Buraco");
  boxCell?.setAttribute("aria-label", "Caixa");
  playerCell?.setAttribute("aria-label", "Jogador");

  status.textContent = state.hasWon
    ? "Boa! Preparando uma nova fase…"
    : "Empurre a caixa até o buraco.";
  stageLabel.textContent = `Fase ${state.stage}`;
  document.body.classList.toggle("won", state.hasWon);
}

const session = new GameSession(generator.generate(1), render, {
  nextLevel: (stage) => generator.generate(stage),
});

document.querySelectorAll("[data-direction]").forEach((button) => {
  button.addEventListener("click", () => {
    session.move(button.dataset.direction);
  });
});

document.querySelector("[data-reset]").addEventListener("click", () => {
  session.reset();
});

const keyDirections = {
  ArrowUp: "up",
  ArrowLeft: "left",
  ArrowDown: "down",
  ArrowRight: "right",
};

window.addEventListener("keydown", (event) => {
  const direction = keyDirections[event.key];
  if (!direction) return;

  event.preventDefault();
  session.move(direction);
});
