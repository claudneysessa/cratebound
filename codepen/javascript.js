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
