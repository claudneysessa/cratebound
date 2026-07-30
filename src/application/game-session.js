import { Game } from "../domain/game.js";

export class GameSession {
  constructor(
    level,
    publish,
    { nextLevel = null, schedule = (action) => setTimeout(action, 900) } = {},
  ) {
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
