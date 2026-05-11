class ThrowableObject extends MoveableObject {
  speedY;
  speedX = 6; // horizontale Geschwindigkeit: kleiner = langsamer, größer = schneller
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
    this.x = x;
    this.y = y;
    this.speedX = direction;
    this.speedY = -20;

    this.gravity();
    this.rotateBottle();

    setInterval(() => {
      if (!this.hasHitGround) {
        this.x += this.speedX;
      }
    }, 1000 / 60);
  }
}

// speedY
// negativer Wert = Bottle fliegt zuerst nach oben
// -15 = flacher Wurf
// -20 = aktueller Wurf
// -25 = höherer Bogen

// Aufgabe:
//	- throw(100,150) x und y koordinate angeben
//	- this.height = ?
//	- this.width = ?

//		in isAboveGround() {
//		if(!this instanceOf ThrowableObject) ) {
//		return this.y < 100;
//		}

//		checkThrowObjects() {
//			if(this.keyboard.D) {
//				let bottle = new ThrowableObject(this.character.x +100, this.character.y + 100)
//				this.throwableobjects.push(bottle);
