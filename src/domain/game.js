const DIRECTIONS = {
  up: { x: 0, y: -1 },
  left: { x: -1, y: 0 },
  down: { x: 0, y: 1 },
  right: { x: 1, y: 0 },
};

function translate(position, direction) {
  return {
    x: position.x + direction.x,
    y: position.y + direction.y,
  };
}

function occupies(position, target) {
  return position.x === target.x && position.y === target.y;
}

export class Game {
  constructor({
    width = Infinity,
    height = Infinity,
    player,
    box,
    hole,
    obstacles = [],
  }) {
    this.width = width;
    this.height = height;
    this.player = { ...player };
    this.box = { ...box };
    this.hole = { ...hole };
    this.obstacles = obstacles.map((position) => ({ ...position }));
  }

  move(directionName) {
    const direction = DIRECTIONS[directionName];
    const nextPlayerPosition = translate(this.player, direction);

    if (!this.isFree(nextPlayerPosition)) {
      return;
    }

    if (occupies(nextPlayerPosition, this.box)) {
      const nextBoxPosition = translate(this.box, direction);

      if (!this.isFree(nextBoxPosition)) {
        return;
      }

      this.box = nextBoxPosition;
    }

    this.player = nextPlayerPosition;
  }

  isInsideRoom(position) {
    return (
      position.x >= 0 &&
      position.x < this.width &&
      position.y >= 0 &&
      position.y < this.height
    );
  }

  isFree(position) {
    return (
      this.isInsideRoom(position) &&
      !this.obstacles.some((obstacle) => occupies(position, obstacle))
    );
  }

  get hasWon() {
    return occupies(this.box, this.hole);
  }
}
