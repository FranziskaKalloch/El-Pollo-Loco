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
   * Starts gravity, bottle rotation and forward movement until the object hits the ground.
   *
   * @param {number} x - The horizontal start position.
   * @param {number} y - The vertical start position.
   * @param {number} direction - The horizontal throw direction and speed.
   */
  throw(x, y, direction) {
    this.x = x;
    this.y = y;
    this.speedX = direction;

    this.speedY = -20; // -15 flacher wurf // -25 höherer Bogen
    this.gravity(); //startet die Gravitation aus MoveableObject, Achtung: acceleration kommt von MoveableObject & beeinflusst auch Pepe
    this.rotateBottle();

    let throwInterval = setInterval(() => {
      this.x += this.speedX;
      if (this.y >= 350 && !this.hasHitGround) {
        this.hasHitGround = true;
        this.animateSplash();

        clearInterval(throwInterval);
        this.speedX = 0;
        this.speedY = 0;
        this.acceleration = 0;
        this.y = 350;
        this.loadImage(this.imagesBottleSplash[0]); // das erste Bild wird beim Aufprall angezeigt
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
