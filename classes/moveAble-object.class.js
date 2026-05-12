class MoveableObject extends DrawableObject {
  x = 120;
  y = 150;
  groundY = 150;
  height = 300;
  width = 150;

  currentImage = 0;
  speed;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  lastHit = 0;

  offset = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };

  constructor() {
    super();
  }

  /**
   * Applies gravity to the object.
   * Moves the object vertically and simulates falling and jumping physics.
   */
  gravity() {
    let interval = setInterval(() => {
      if (this.isAboveGround() || this.speedY < 0) {
        this.y = this.y + this.speedY;
        this.speedY = this.speedY + this.acceleration;
      } else {
        this.y = this.groundY;
        this.speedY = 0;
      }
    }, 1000 / 25);

    intervalIds.push(interval);
  }

  /**
   * Checks whether the object is currently above the ground.
   * Throwable objects are always treated as airborne.
   *
   * @returns {boolean} Whether the object is above the ground.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    }
    return this.y < this.groundY;
  }

  /**
   * Checks whether this object collides with another object.
   * Uses hitbox offsets for more accurate collision detection.
   *
   * @param {MoveableObject} object - The object to check collision against.
   * @returns {boolean} Whether the objects are colliding.
   */
  isColliding(object) {
    return (
      this.x + this.width - this.offset.right > object.x + object.offset.left &&
      this.y + this.height - this.offset.bottom >
        object.y + object.offset.top && // this unten + object oben
      this.x + this.offset.left <
        object.x + object.width - object.offset.right &&
      this.y + this.offset.top < object.y + object.height - object.offset.bottom
    );
  }

  /**
   * Reduces the object's energy when taking damage
   * and stores the timestamp of the hit.
   */
  hit() {
    if (this.energy > 0) {
      this.energy -= 20;
      this.lastHit = Date.now(); // jetzt wurde ich getroffen, genau in dieser Sekunde
    }
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  /**
   * Checks whether the object is currently in the hurt state.
   * Prevents repeated damage for a short cooldown period.
   *
   * @returns {boolean} Whether the object is currently hurt.
   */
  isHurt() {
    let timeSinceLastHit = Date.now() - this.lastHit;
    return timeSinceLastHit < 1000;
  }

  /**
   * Checks whether the object's energy has reached zero.
   *
   * @returns {boolean} Whether the object is dead.
   */
  isDead() {
    return this.energy === 0;
  }
}

