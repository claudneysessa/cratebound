const DIRECTIONS = {
  up: { x: 0, y: -1 },
  left: { x: -1, y: 0 },
  down: { x: 0, y: 1 },
  right: { x: 1, y: 0 },
};

const translate = (position, direction) => ({
  x: position.x + direction.x,
  y: position.y + direction.y,
});

const occupies = (position, target) =>
  position.x === target.x && position.y === target.y;

class Game {
  constructor({ width, height, player, box, hole, obstacles = [] }) {
    this.width = width;
    this.height = height;
    this.player = { ...player };
    this.box = { ...box };
    this.hole = { ...hole };
    this.obstacles = obstacles.map((position) => ({ ...position }));
  }

  move(directionName) {
    const direction = DIRECTIONS[directionName];
    const nextPlayer = translate(this.player, direction);

    if (!this.isFree(nextPlayer)) return;

    if (occupies(nextPlayer, this.box)) {
      const nextBox = translate(this.box, direction);
      if (!this.isFree(nextBox)) return;
      this.box = nextBox;
    }

    this.player = nextPlayer;
  }

  isInsideRoom(position) {
    return position.x >= 0 && position.x < this.width
      && position.y >= 0 && position.y < this.height;
  }

  isFree(position) {
    return this.isInsideRoom(position)
      && !this.obstacles.some((obstacle) => occupies(position, obstacle));
  }

  get hasWon() {
    return occupies(this.box, this.hole);
  }
}

const SOLVER_DIRECTIONS = Object.values(DIRECTIONS);
const keyOf = ({ x, y }) => `${x},${y}`;

function isLevelSolvable(level) {
  const obstacles = new Set(level.obstacles.map(keyOf));
  const isFree = (position) =>
    position.x >= 0 && position.x < level.width
    && position.y >= 0 && position.y < level.height
    && !obstacles.has(keyOf(position));
  const queue = [{ player: level.player, box: level.box }];
  const visited = new Set([`${keyOf(level.player)}|${keyOf(level.box)}`]);

  for (let index = 0; index < queue.length; index += 1) {
    const state = queue[index];
    if (occupies(state.box, level.hole)) return true;

    for (const direction of SOLVER_DIRECTIONS) {
      const nextPlayer = translate(state.player, direction);
      let nextBox = state.box;
      if (!isFree(nextPlayer)) continue;

      if (occupies(nextPlayer, state.box)) {
        nextBox = translate(state.box, direction);
        if (!isFree(nextBox)) continue;
      }

      const stateKey = `${keyOf(nextPlayer)}|${keyOf(nextBox)}`;
      if (visited.has(stateKey)) continue;
      visited.add(stateKey);
      queue.push({ player: nextPlayer, box: nextBox });
    }
  }

  return false;
}

class LevelGenerator {
  constructor({ width = 8, height = 8, random = Math.random } = {}) {
    this.width = width;
    this.height = height;
    this.random = random;
  }

  generate(stage = 1) {
    const obstacleCount = Math.min(10 + stage, 22);

    for (let attempt = 0; attempt < 300; attempt += 1) {
      const positions = this.shuffledPositions();
      const level = {
        width: this.width,
        height: this.height,
        player: positions[0],
        box: positions[1],
        hole: positions[2],
        obstacles: positions.slice(3, 3 + obstacleCount),
      };
      if (isLevelSolvable(level)) return level;
    }

    return this.guaranteedLevel(obstacleCount);
  }

  shuffledPositions() {
    const positions = [];
    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) positions.push({ x, y });
    }
    for (let index = positions.length - 1; index > 0; index -= 1) {
      const target = Math.floor(this.random() * (index + 1));
      [positions[index], positions[target]] = [positions[target], positions[index]];
    }
    return positions;
  }

  guaranteedLevel(obstacleCount) {
    const solutionRow = Math.floor(this.height / 2);
    const reserved = new Set(
      Array.from({ length: this.width }, (_, x) => `${x},${solutionRow}`),
    );
    const candidates = this.shuffledPositions()
      .filter((position) => !reserved.has(keyOf(position)));

    return {
      width: this.width,
      height: this.height,
      player: { x: 1, y: solutionRow },
      box: { x: 2, y: solutionRow },
      hole: { x: this.width - 2, y: solutionRow },
      obstacles: candidates.slice(0, obstacleCount),
    };
  }
}

class GameSession {
  constructor(level, publish, {
    nextLevel = null,
    schedule = (action) => setTimeout(action, 900),
  } = {}) {
    this.level = structuredClone(level);
    this.publish = publish;
    this.nextLevel = nextLevel;
    this.schedule = schedule;
    this.stage = 1;
    this.transitioning = false;
    this.reset();
  }

  move(direction) {
    if (this.transitioning) return;
    this.game.move(direction);
    this.publishState();
    if (this.game.hasWon && this.nextLevel) {
      this.transitioning = true;
      this.schedule(() => this.advance());
    }
  }

  reset() {
    this.game = new Game(this.level);
    this.transitioning = false;
    this.publishState();
  }

  advance() {
    this.stage += 1;
    this.level = structuredClone(this.nextLevel(this.stage));
    this.reset();
  }

  publishState() {
    this.publish({
      width: this.game.width,
      height: this.game.height,
      player: { ...this.game.player },
      box: { ...this.game.box },
      hole: { ...this.game.hole },
      obstacles: this.game.obstacles.map((position) => ({ ...position })),
      hasWon: this.game.hasWon,
      stage: this.stage,
    });
  }
}

class CameraCommandGate {
  constructor({
    minimumConfidence = 0.6,
    stablePredictions = 2,
    intervalMs = 400,
  } = {}) {
    this.minimumConfidence = minimumConfidence;
    this.stablePredictions = stablePredictions;
    this.intervalMs = intervalMs;
    this.lastDirection = null;
    this.repetitions = 0;
    this.lastMovementAt = -Infinity;
  }

  accept(direction, confidence, now = Date.now()) {
    if (confidence < this.minimumConfidence) {
      this.lastDirection = null;
      this.repetitions = 0;
      return null;
    }
    if (direction === this.lastDirection) this.repetitions += 1;
    else {
      this.lastDirection = direction;
      this.repetitions = 1;
    }
    if (
      this.repetitions < this.stablePredictions
      || now - this.lastMovementAt < this.intervalMs
    ) return null;

    this.lastMovementAt = now;
    this.repetitions = 0;
    return direction;
  }
}

const REQUIRED_CAMERA_SAMPLES = 10;

function hasEnoughCameraSamples(counts, required = REQUIRED_CAMERA_SAMPLES) {
  return counts.length === 4 && counts.every((count) => count >= required);
}

function cameraTrainingProgress(counts, required = REQUIRED_CAMERA_SAMPLES) {
  const collected = counts.reduce(
    (total, count) => total + Math.min(count, required),
    0,
  );
  return Math.round((collected / (required * 4)) * 100);
}

class WebcamController {
  constructor({ video, gate, onDirection, onStatus, onSamples, onPrediction }) {
    this.video = video;
    this.gate = gate;
    this.onDirection = onDirection;
    this.onStatus = onStatus;
    this.onSamples = onSamples;
    this.onPrediction = onPrediction;
    this.examples = [[], [], [], []];
    this.directions = ["up", "left", "down", "right"];
    this.isPredicting = false;
  }

  async start() {
    if (!globalThis.tf || !globalThis.mobilenet) {
      throw new Error("TensorFlow.js ou MobileNet não foi carregado.");
    }
    this.onStatus("Solicitando acesso à câmera…");
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: 224, height: 224 },
      audio: false,
    });
    this.video.srcObject = stream;
    await this.video.play();
    this.onStatus("Carregando MobileNet…");
    this.featureExtractor = await mobilenet.load({ version: 2, alpha: 0.5 });
    const warmup = this.extractFeatures();
    warmup.dispose();
    this.onStatus("Câmera pronta. Colete exemplos para cada direção.");
  }

  extractFeatures() {
    return tf.tidy(() => this.featureExtractor.infer(this.video, true).clone());
  }

  addExample(label) {
    if (!this.featureExtractor) {
      throw new Error("Ative a câmera antes de coletar exemplos.");
    }
    this.examples[label].push(this.extractFeatures());
    this.onSamples(this.examples.map((items) => items.length));
  }

  async train() {
    if (this.examples.some((items) => items.length < 10)) {
      throw new Error("Complete 10 exemplos em cada direção.");
    }
    this.stopPredicting();
    this.model?.dispose();
    const tensors = this.examples.flat();
    const labels = this.examples.flatMap((items, label) => items.map(() => label));
    const xs = tf.concat(tensors);
    const ys = tf.oneHot(tf.tensor1d(labels, "int32"), this.directions.length);
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({
          inputShape: xs.shape.slice(1),
          units: 64,
          activation: "relu",
          kernelInitializer: "varianceScaling",
        }),
        tf.layers.dense({
          units: this.directions.length,
          activation: "softmax",
          kernelInitializer: "varianceScaling",
        }),
      ],
    });
    this.model.compile({
      optimizer: tf.train.adam(0.0001),
      loss: "categoricalCrossentropy",
      metrics: ["accuracy"],
    });
    this.onStatus("Treinando o controle…");
    await this.model.fit(xs, ys, {
      epochs: 20,
      batchSize: Math.min(16, labels.length),
      shuffle: true,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          const accuracy = logs.acc ?? logs.accuracy ?? 0;
          this.onStatus(
            `Treinando: ${epoch + 1}/20 · precisão ${(accuracy * 100).toFixed(0)}%`,
          );
        },
      },
    });
    xs.dispose();
    ys.dispose();
    this.onStatus("Treino concluído. Ative o controle por câmera.");
  }

  togglePredicting() {
    if (!this.model) {
      throw new Error("Treine o controle antes de jogar com a câmera.");
    }
    this.isPredicting = !this.isPredicting;
    if (this.isPredicting) {
      this.onStatus("Controle por câmera ativo.");
      this.predict();
    } else this.onStatus("Controle por câmera pausado.");
    return this.isPredicting;
  }

  stopPredicting() {
    this.isPredicting = false;
  }

  async predict() {
    while (this.isPredicting) {
      const features = this.extractFeatures();
      const prediction = this.model.predict(features);
      const probabilities = await prediction.data();
      features.dispose();
      prediction.dispose();
      let label = 0;
      for (let index = 1; index < probabilities.length; index += 1) {
        if (probabilities[index] > probabilities[label]) label = index;
      }
      const direction = this.directions[label];
      const confidence = probabilities[label];
      this.onPrediction(direction, confidence);
      const command = this.gate.accept(direction, confidence);
      if (command) this.onDirection(command);
      await tf.nextFrame();
    }
  }
}

const generator = new LevelGenerator();
const board = document.querySelector("[data-board]");
const status = document.querySelector("[data-status]");
const stageLabel = document.querySelector("[data-stage]");

function prepareBoard(state) {
  if (board.children.length === state.width * state.height) return;
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

const cellAt = ({ x, y }) =>
  board.querySelector(`[data-x="${x}"][data-y="${y}"]`);

function render(state) {
  prepareBoard(state);
  board.querySelectorAll(".player, .box, .hole, .obstacle").forEach((cell) => {
    cell.classList.remove("player", "box", "hole", "obstacle");
    cell.removeAttribute("aria-label");
  });

  state.obstacles.forEach((position) => {
    const cell = cellAt(position);
    cell.classList.add("obstacle");
    cell.setAttribute("aria-label", "Obstáculo");
  });

  const holeCell = cellAt(state.hole);
  const boxCell = cellAt(state.box);
  const playerCell = cellAt(state.player);

  holeCell.classList.add("hole");
  boxCell.classList.add("box");
  playerCell.classList.add("player");
  holeCell.setAttribute("aria-label", "Buraco");
  boxCell.setAttribute("aria-label", "Caixa");
  playerCell.setAttribute("aria-label", "Jogador");

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
  button.addEventListener("click", () => session.move(button.dataset.direction));
});

document.querySelector("[data-reset]")
  .addEventListener("click", () => session.reset());

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
const directionNames = {
  up: "cima",
  left: "esquerda",
  down: "baixo",
  right: "direita",
};
const webcamController = new WebcamController({
  video: document.querySelector("[data-webcam]"),
  gate: new CameraCommandGate(),
  onDirection: (direction) => {
    session.move(direction);
    cameraStatus.textContent = `Comando enviado: ${directionNames[direction]}`;
  },
  onStatus: (message) => { cameraStatus.textContent = message; },
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
    cameraStatus.textContent = `${direction} · ${(confidence * 100).toFixed(0)}%`;
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
    sampleButtons.forEach((button) => { button.disabled = false; });
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
      cameraAction(() => webcamController.addExample(Number(button.dataset.sample)));
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
