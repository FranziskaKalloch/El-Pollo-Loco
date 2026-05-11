class Chicken extends MoveableObject {
  img;
  imagesWalking = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  imagesDead = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  imageCache = [];

  currentImage = 0;
  isKilled = false;
  deathTime;
  lastAnimationTime = 0;
  animationInterval = 100;

  offset = {
    top: 25,
    bottom: 10,
    left: 30,
    right: 30,
  };

  /**
   * Creates a new chicken enemy with randomized movement speed
   * and initializes its images and animation cache.
   *
   * @param {number} x - The horizontal start position of the chicken.
   * @param {number} y - The vertical start position of the chicken.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = 350;
    this.width = 100;
    this.height = 100;
    this.speed = 0.15 + Math.random() * 0.3;
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadToCache();
  }

  /**
   * Loads all walking animation images into the image cache.
   */
  loadToCache() {
    for (let i = 0; i < this.imagesWalking.length; i++) {
      let image = new Image();
      image.src = this.imagesWalking[i];
      this.imageCache.push(image);
    }
  }

  /**
   * Updates the chicken state.
   * Handles movement, walking animation and death image.
   */
  update() {
    if (this.isKilled) {
      this.loadImage(this.imagesDead[0]);
      return;
    }
    this.moveLeft();
    this.playWalkingAnimation();
  }

  /**
   * Moves the chicken continuously to the left side of the level.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Plays the walking animation by switching between cached images.
   * Controls animation timing using an interval check.
   */
  playWalkingAnimation() {
    let now = Date.now();
    if (now - this.lastAnimationTime < this.animationInterval) {
      return;
    }
    this.img = this.imageCache[this.currentImage];
    this.currentImage++;

    if (this.currentImage >= this.imageCache.length) {
      this.currentImage = 0;
    }
    this.lastAnimationTime = now;
  }
}