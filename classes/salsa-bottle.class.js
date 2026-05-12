class SalsaBottle extends ThrowableObject {
  imagesBottleRotation = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  imagesBottleSplash = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  imagesBottleOnGround = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates a new salsa bottle object.
   * Initializes its image, position, size and ground bottle images.
   *
   * @param {number} x - The horizontal start position of the bottle.
   */
  constructor(x) {
    super();
    this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.imagesBottleOnGround);
    this.y = 350;
    this.x = x;
    this.width = 80;
    this.height = 100;
  }

  offset = {
    top: 40,
    bottom: 40,
    left: 45,
    right: 45,
  };

  splashStartTime;

  /**
   * Rotates the bottle continuously while it is flying through the air.
   * Stops rotating after the bottle hits the ground.
   */
  rotateBottle() {
    let currentImage = 0;
    let interval = setInterval(() => {
      if (this.hasHitGround) {
        return;
      }
      currentImage++;
      let index = currentImage % this.imagesBottleRotation.length;
      this.loadImage(this.imagesBottleRotation[index]);
    }, 1000 / 10);

    intervalIds.push(interval);
  }

  /**
   * Plays the bottle splash animation after impact.
   * Stops automatically after the last splash image.
   */
  animateSplash() {
    let currentImage = 0;
    let interval = setInterval(() => {
      let index = this.imagesBottleSplash[currentImage];
      currentImage++;
      this.loadImage(index);
      if (currentImage >= this.imagesBottleSplash.length) {
        clearInterval(interval);
      }
    }, 1000 / 10);
    intervalIds.push(interval);
  }
}
