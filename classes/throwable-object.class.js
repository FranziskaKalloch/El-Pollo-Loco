class ThrowableObject extends MoveableObject {
  speedY;
  speedX = 6;
  hasHitGround = false;

  /**
   * Creates a new throwable object.
   */
  constructor() {
    super();
  }

  /**
   * Throws the object from a given start position into a given direction.
   * Starts gravity, bottle rotation and forward movement.
   *
   * @param {number} x - The horizontal start position.
   * @param {number} y - The vertical start position.
   * @param {number} direction - The horizontal throw direction and speed.
   */
  throw(x, y, direction) {
    this.setThrowOffset();
    this.x = x;
    this.y = y;
    this.speedX = direction;
    this.speedY = -20;
    this.gravity();
    this.rotateBottle();
    let interval = setInterval(() => {
      if (!this.hasHitGround) {
        this.x += this.speedX;
      }
    }, 1000 / 60);

    intervalIds.push(interval);
  }

  /**
   * Sets a larger collision box for the thrown bottle.
   * Makes hits against enemies easier during flight.
   */
  setThrowOffset() {
    this.offset = {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    };
  }
}
