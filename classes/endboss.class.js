class Endboss extends MoveableObject {
  imagesWalking = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  imagesAlert = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  imagesAttack = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  imagesHurt = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  imagesDead = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates a new endboss and initializes its position, size, images,
   * animation loop and gravity.
   *
   * @param {World} world - The game world that contains the character and game state.
   */
  constructor(world) {
    super();
    this.world = world; // Der Endboss bekommt die Welt von außen übergeben, damit wir auf die Elemente dort zugreifen können ---> hier wollen wir den character holen
    this.x = 4700;
    this.groundY = -10;
    this.y = this.groundY;
    this.width = 350;
    this.height = 500;
    this.speed = 3;
    this.loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesAlert);
    this.loadImages(this.imagesAttack);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);
    this.animate();
    this.gravity();
  }

  state = "walking";
  leftLimit = 3600;
  rightLimit = 4800;
  movingRight = false;

  lastAttack = 0;
  attackCooldown = 1800;
  attackRange = 650;
  attackSpeed = 22;
  attackDirection = -1;

  deadAnimationStarted = false;
  deadAnimationFinished = false;
  deadFrameCounter = 0;

  isActivated = false;

  /**
   * Starts the endboss animation and behavior loop.
   * Checks activation, attack range, movement and image updates.
   */
  animate() {
    setInterval(() => {
      this.checkActivation();
      if (!this.isActivated) {
        this.updateImages();
        return;
      }

      this.checkAttackRange();
      this.moveDuringAttack();
      this.moveBox();
      this.updateImages();
    }, 100);
  }

  /**
   * Updates the current endboss image depending on its state.
   * Plays the death animation if the endboss has no energy left.
   */
  updateImages() {
    if (this.isDead()) {
      this.playDeadAnimation();
      return;
    }
    if (this.state === "hurt" && !this.isHurt()) {
      this.state = "walking";
    }
    this.playLoopAnimation();
  }
  /**
   * Activates the endboss when the character reaches the boss area.
   */
  checkActivation() {
    if (this.world.character.x > 4100) {
      this.isActivated = true;
    }
  }

  /**
   * Plays the correct loop animation
   * depending on the current endboss state.
   */
  playLoopAnimation() {
    let currentImages = this.getCurrentAnimationImages();

    this.showAnimationImage(currentImages);
    this.resetAttackAnimation();
  }

  /**
   * Returns the correct image array
   * for the current endboss state.
   */
  getCurrentAnimationImages() {
    if (this.state === "dead") {
      return this.imagesDead;
    }
    if (this.state === "hurt") {
      return this.imagesHurt;
    }
    if (this.state === "attack") {
      return this.imagesAttack;
    }
    if (this.state === "alert") {
      return this.imagesAlert;
    }
    return this.imagesWalking;
  }

  /**
   * Displays the next image
   * of the current endboss animation.
   *
   * @param {string[]} currentImages - Current animation image array.
   */
  showAnimationImage(currentImages) {
    let imageIndex = this.currentImage % currentImages.length;
    let path = currentImages[imageIndex];

    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Resets the attack animation
   * after it has finished.
   */
  resetAttackAnimation() {
    if (
      this.state === "attack" &&
      this.currentImage >= this.imagesAttack.length
    ) {
      this.state = "walking";
      this.currentImage = 0;
    }
  }

  /**
   * Moves the endboss left and right between its movement limits.
   * Stops regular movement while the endboss is attacking.
   */
  moveBox() {
    if (this.state === "attack") {
      // Dann bleibt der boss während der Attacke stehen
      return;
    }
    if (!this.movingRight) {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }
    if (this.x >= this.rightLimit) {
      this.movingRight = false;
    }
    if (this.x <= this.leftLimit) {
      this.movingRight = true;
    }
  }

  /**
   * Checks whether the character is close enough for an attack.
   * Starts an attack if the cooldown is over and the endboss is on the ground.
   */
  checkAttackRange() {
    let distance = Math.abs(this.x - this.world.character.x);
    if (
      distance < this.attackRange &&
      this.state === "walking" &&
      Date.now() - this.lastAttack > this.attackCooldown &&
      !this.isAboveGround()
    ) {
      this.attack();
    }
  }

  /**
   * Starts an attack by setting the attack state, resetting the animation
   * and giving the endboss upward movement.
   */
  attack() {
    this.setAttackDirection();
    this.state = "attack";
    this.lastAttack = Date.now();
    this.currentImage = 0;
    this.speedY = -40;
  }

  /**
   * Moves the endboss forward during an attack.
   * Stops the attack when the left movement limit is reached.
   */
  moveDuringAttack() {
    if (this.state === "attack") {
      this.x += this.attackSpeed * this.attackDirection;
    }
    this.stopAttackAtLimits();
  }

  /**
   * Sets the attack direction depending
   * on the current character position.
   * The endboss turns towards Pepe before attacking.
   */
  setAttackDirection() {
    if (this.world.character.x < this.x) {
      this.attackDirection = -1;
      this.otherDirection = false;
    } else {
      this.attackDirection = 1;
      this.otherDirection = true;
    }
  }

  /**
   * Stops the attack movement when the endboss
   * reaches the left or right movement limit.
   */
  stopAttackAtLimits() {
    if (this.x < this.leftLimit) {
      this.x = this.leftLimit;
      this.state = "walking";
      this.movingRight = true;
    }

    if (this.x > this.rightLimit) {
      this.x = this.rightLimit;
      this.state = "walking";
      this.movingRight = false;
    }
  }
}


// Zugriff auf Pepe
// -- der Endboss muss wissen, wo der Character ist!

// Distanz berechnen
// .. Unterschied zwischen den x-Werten
// -- also wie weit ist Pepe vom Boss entfernt

// Entscheidung 
// ... wenn Distanz < x dann attack() 
// --- attack() darf nicht dauerhaft gespammt werden 