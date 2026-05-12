class Character extends MoveableObject {
  imagesWalking = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  imagesJumping = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  imagesHurt = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  imagesDead = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  imagesIdle = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  imagesLongIdle = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  canJump = true;
  jumpFrameCounter = 0;
  jumpImageIndex = 0;
  wasInAir = false;

  deadAnimationStarted = false;
  deadFrameCounter = 0;
  coins = 0;
  lastActionTime = Date.now();
  isSnoring = false;

  /**
   * Creates a new character and initializes animations,
   * sounds, gravity and movement behavior.
   *
   * @param {World} world - The game world that contains the character state and controls.
   */
  constructor(world) {
    super();
    this.world = world;
    this.loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalking); // Funktion hat einen Parameter, also kann ich auch nur ein Argument übergeben...
    this.loadImages(this.imagesJumping); // daher wird sie zweimal aufgerufen
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesLongIdle);
    this.sound = sound;
    this.animate();
    this.gravity();
    this.jump();
  }

  /**
   * Updates the current character image.
   * Plays the death animation if the character is dead,
   * otherwise plays the regular movement animations.
   */
  updateImages() {
    // DEAD zuerst behandeln
    if (this.isDead()) {
      this.playDeadAnimation();
      return;
    } else {
      // normale Animation
      this.playLoopAnimation();
    }
  }

  /**
   * Starts the main character animation loop.
   * Handles movement and image updates continuously.
   */
  animate() {
    setInterval(() => {
      if (gamePaused) {
        return;
      }
      this.move(); // move forward & backward
      this.updateImages();
    }, 100);
  }

  /**
   * Plays the correct loop animation
   * depending on the current character state.
   */
  playLoopAnimation() {
    let currentImages = this.getCurrentLoopImages();
    if (!currentImages) {
      return;
    }
    this.resetJumpAnimation();
    this.showLoopImage(currentImages);
  }

  /**
   * Returns the correct image array
   * for the current character state.
   */
  getCurrentLoopImages() {
    let idleImages = this.idle();
    if (this.isHurt()) {
      return this.imagesHurt;
    }
    if (this.isAboveGround()) {
      this.playJumpAnimationOnce();
      return null;
    }
    if (idleImages) {
      return idleImages;
    }
    if (this.isMoving()) {
      return this.imagesWalking;
    }
    return [this.imagesIdle[0]];
  }

  /**
   * Checks if the character is moving left or right.
   */
  isMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Resets the jump animation state
   * when the character is not in the air.
   */
  resetJumpAnimation() {
    this.jumpImageIndex = 0;
    this.jumpFrameCounter = 0;
    this.wasInAir = false;
  }

  /**
   * Displays the next image of the current loop animation.
   *
   * @param {string[]} currentImages - The current animation image array.
   */
  showLoopImage(currentImages) {
    let imageIndex = this.currentImage % currentImages.length;
    let path = currentImages[imageIndex];

    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Handles all horizontal character movement
   * and updates the camera position.
   */
  move() {
    this.moveRight();
    this.moveLeft();
    this.updateCamera();
  }

  /**
   * Moves the character to the right
   * while staying inside the level bounds.
   */
  moveRight() {
    if (
      this.world.keyboard.RIGHT &&
      this.x + this.width < this.world.levelEndX
    ) {
      if (this.isAboveGround()) {
        this.x += 16;
      } else {
        this.x += 15;
      }

      this.otherDirection = false;
    }
  }

  /**
   * Moves the character to the left
   * while preventing movement beyond the level start.
   */
  moveLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.x -= 11;
      this.otherDirection = true;
    }
  }

  /**
   * Updates the camera position
   * and applies camera boundaries.
   */
  updateCamera() {
    this.world.camera_x = -this.x + 100;
    this.stopCameraAtStart();
    this.stopCameraAtEnd();
  }

  /**
   * Prevents the camera from moving
   * beyond the start of the level.
   */
  stopCameraAtStart() {
    if (this.world.camera_x > 0) {
      this.world.camera_x = 0;
    }
  }

  /**
   * Prevents the camera from moving
   * beyond the end of the level.
   */
  stopCameraAtEnd() {
    if (
      this.world.camera_x < -(this.world.levelEndX - this.world.canvas.width)
    ) {
      this.world.camera_x = -(this.world.levelEndX - this.world.canvas.width);
    }
  }

  /**
   * Plays the character death animation once.
   */
  playDeadAnimation() {
    this.startDeadAnimation();
    this.showDeadImage();
    this.nextDeadFrame();
  }

  /**
   * Starts the death animation.
   */
  startDeadAnimation() {
    if (!this.deadAnimationStarted) {
      this.currentImage = 0;
      this.deadAnimationStarted = true;
      this.deadFrameCounter = 0;
    }
  }

  /**
   * Displays the current death animation frame.
   */
  showDeadImage() {
    let imageIndex = Math.min(this.currentImage, this.imagesDead.length - 1);
    let path = this.imagesDead[imageIndex];
    this.img = this.imageCache[path];
  }

  /**
   * Advances the death animation slowly
   * until the last frame is reached.
   */
  nextDeadFrame() {
    this.deadFrameCounter++;
    if (
      this.deadFrameCounter % 5 === 0 &&
      this.currentImage < this.imagesDead.length - 1
    ) {
      this.currentImage++;
    }
  }

  /**
   * Handles jump input and starts a new jump.
   * Prevents continuous jump resets while the space key is held down.
   */
  jump() {
    setInterval(() => {
      if (gamePaused) {
        return;
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround() && this.canJump) {
        this.speedY = -30;
        this.canJump = false;
        this.startJumpAnimation();
        this.sound.play("jump");
      }
      if (!this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.canJump = true;
      }
    }, 1000 / 25);
  }

  /**
   * Resets the jump animation state for a new jump cycle.
   */
  startJumpAnimation() {
    this.jumpImageIndex = 0;
    this.jumpFrameCounter = 0;
    this.wasInAir = false;
  }

  /**
   * Plays the jump animation exactly once per jump.
   * Stops on the last jump frame until Pepe lands again.
   */
  playJumpAnimationOnce() {
    if (!this.wasInAir) {
      this.jumpImageIndex = 0;
      this.jumpFrameCounter = 0;
      this.wasInAir = true;
    }
    let lastIndex = this.imagesJumping.length - 1;
    let imagePath = this.imagesJumping[this.jumpImageIndex];
    this.img = this.imageCache[imagePath];
    this.jumpFrameCounter++;
    if (this.jumpFrameCounter % 2 === 0 && this.jumpImageIndex < lastIndex) {
      this.jumpImageIndex++;
    }
  }

  /**
   * Increases the collected coin amount of the character.
   */
  collectCoins() {
    this.coins += 20;
  }

  /**
   * Determines whether the character should play an idle animation.
   *
   * @returns {Array<string>|undefined} The current idle animation images.
   */
  idle() {
    this.checkPlayerActivity();
    let idleTime = Date.now() - this.lastActionTime;
    return this.getIdleImages(idleTime);
  }

  /**
   * Checks whether the player is currently active.
   * Stops the snore sound when movement is detected.
   */
  checkPlayerActivity() {
    if (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.SPACE ||
      this.world.keyboard.D
    ) {
      this.lastActionTime = Date.now();

      if (this.isSnoring) {
        this.sound.stopSnoreSound();
        this.isSnoring = false;
      }
    }
  }

  /**
   * Returns the correct idle animation
   * depending on the current idle time.
   *
   * @param {number} idleTime - Current inactivity time in milliseconds.
   * @returns {Array<string>|undefined} The current idle animation images.
   */
  getIdleImages(idleTime) {
    if (idleTime > 5000) {
      this.startSnoring();
      return this.imagesLongIdle;
    }

    if (idleTime > 3000) {
      return this.imagesIdle;
    }
  }

  /**
   * Starts the snore sound once.
   */
  startSnoring() {
    if (!this.isSnoring) {
      this.sound.playSnoreSound();
      this.isSnoring = true;
    }
  }
}
