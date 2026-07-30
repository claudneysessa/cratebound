const DIRECTIONS = [
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
];

const keyOf = ({ x, y }) => `${x},${y}`;
const samePosition = (a, b) => a.x === b.x && a.y === b.y;
const translate = (position, direction) => ({
  x: position.x + direction.x,
  y: position.y + direction.y,
});

function isFree(level, position, obstacles) {
  return (
    position.x >= 0 &&
    position.x < level.width &&
    position.y >= 0 &&
    position.y < level.height &&
    !obstacles.has(keyOf(position))
  );
}

export function isLevelSolvable(level) {
  const obstacles = new Set(level.obstacles.map(keyOf));
  const queue = [{ player: level.player, box: level.box }];
  const visited = new Set([
    `${keyOf(level.player)}|${keyOf(level.box)}`,
  ]);

  for (let index = 0; index < queue.length; index += 1) {
    const state = queue[index];

    if (samePosition(state.box, level.hole)) {
      return true;
    }

    for (const direction of DIRECTIONS) {
      const nextPlayer = translate(state.player, direction);
      let nextBox = state.box;

      if (!isFree(level, nextPlayer, obstacles)) continue;

      if (samePosition(nextPlayer, state.box)) {
        nextBox = translate(state.box, direction);
        if (!isFree(level, nextBox, obstacles)) continue;
      }

      const stateKey = `${keyOf(nextPlayer)}|${keyOf(nextBox)}`;
      if (visited.has(stateKey)) continue;

      visited.add(stateKey);
      queue.push({ player: nextPlayer, box: nextBox });
    }
  }

  return false;
}

export class LevelGenerator {
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

      if (isLevelSolvable(level)) {
        return level;
      }
    }

    return this.guaranteedLevel(obstacleCount);
  }

  shuffledPositions() {
    const positions = [];

    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        positions.push({ x, y });
      }
    }

    for (let index = positions.length - 1; index > 0; index -= 1) {
      const target = Math.floor(this.random() * (index + 1));
      [positions[index], positions[target]] = [
        positions[target],
        positions[index],
      ];
    }

    return positions;
  }

  guaranteedLevel(obstacleCount) {
    const solutionRow = Math.floor(this.height / 2);
    const reserved = new Set(
      Array.from({ length: this.width }, (_, x) => `${x},${solutionRow}`),
    );
    const obstacleCandidates = this.shuffledPositions().filter(
      (position) => !reserved.has(keyOf(position)),
    );

    return {
      width: this.width,
      height: this.height,
      player: { x: 1, y: solutionRow },
      box: { x: 2, y: solutionRow },
      hole: { x: this.width - 2, y: solutionRow },
      obstacles: obstacleCandidates.slice(0, obstacleCount),
    };
  }
}

