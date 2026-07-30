import { GameSession } from "../application/game-session.js";
import { CameraCommandGate } from "../application/camera-command-gate.js";
import {
  cameraTrainingProgress,
  hasEnoughCameraSamples,
  REQUIRED_CAMERA_SAMPLES,
} from "../application/camera-training-progress.js";
import { LevelGenerator } from "../domain/level-generator.js";
import { WebcamController } from "./webcam-controller.js";

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

const cameraStatus = document.querySelector("[data-camera-status]");
const cameraToggle = document.querySelector("[data-camera-control]");
const cameraTrain = document.querySelector("[data-camera-train]");
const cameraProgress = document.querySelector("[data-camera-progress]");
const sampleButtons = document.querySelectorAll("[data-sample]");
const webcamController = new WebcamController({
  video: document.querySelector("[data-webcam]"),
  gate: new CameraCommandGate(),
  onDirection: (direction) => session.move(direction),
  onStatus: (message) => {
    cameraStatus.textContent = message;
  },
  onSamples: (counts) => {
    sampleButtons.forEach((button) => {
      const count = counts[button.dataset.sample];
      button.querySelector("span").textContent =
        `${Math.min(count, REQUIRED_CAMERA_SAMPLES)}/${REQUIRED_CAMERA_SAMPLES}`;
      button.classList.toggle("ready", count >= REQUIRED_CAMERA_SAMPLES);
    });
    const progress = cameraTrainingProgress(counts);
    cameraProgress.value = progress;
    cameraProgress.textContent = `${progress}%`;
    cameraTrain.disabled = !hasEnoughCameraSamples(counts);
    cameraStatus.textContent = hasEnoughCameraSamples(counts)
      ? "Exemplos completos. Agora clique em Treinar controle."
      : "Segure um botão enquanto mantém o gesto correspondente.";
  },
  onPrediction: (direction, confidence) => {
    cameraStatus.textContent =
      `${direction} · ${(confidence * 100).toFixed(0)}%`;
  },
});

async function cameraAction(action) {
  try {
    await action();
  } catch (error) {
    cameraStatus.textContent = error.message;
  }
}

document.querySelector("[data-camera-start]").addEventListener("click", (event) => {
  event.currentTarget.disabled = true;
  cameraAction(async () => {
    await webcamController.start();
    sampleButtons.forEach((button) => {
      button.disabled = false;
    });
  });
});

let sampleTimer = null;

function stopCollecting() {
  clearInterval(sampleTimer);
  sampleTimer = null;
}

sampleButtons.forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    stopCollecting();
    const collect = () => {
      cameraAction(() =>
        webcamController.addExample(Number(button.dataset.sample)),
      );
    };
    collect();
    sampleTimer = setInterval(collect, 160);
  });
});

window.addEventListener("pointerup", stopCollecting);
window.addEventListener("pointercancel", stopCollecting);

cameraTrain.addEventListener("click", () => {
  cameraAction(async () => {
    await webcamController.train();
    cameraToggle.disabled = false;
    webcamController.togglePredicting();
    cameraToggle.textContent = "Pausar câmera";
  });
});

cameraToggle.addEventListener("click", () => {
  cameraAction(() => {
    const active = webcamController.togglePredicting();
    cameraToggle.textContent = active ? "Pausar câmera" : "Jogar com a câmera";
  });
});
