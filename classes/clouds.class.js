class Cloud extends MoveableObject {
  /**
   * Creates a new cloud object and initializes
   * its position, size, image and movement animation.
   *
   * @param {number} x - The horizontal start position of the cloud.
   */
  constructor(x) {
    super();
    this.x = x;
    this.y = 50;
    this.width = 250;
    this.height = 200;
    this.loadImage("./img/5_background/layers/4_clouds/1.png");
    this.animate();
  }

  /**
   * Continuously moves the cloud to the left side of the screen.
   */
  animate() {
    let interval = setInterval(() => {
      this.x -= 0.15;
    }, 1000 / 60);

    intervalIds.push(interval);
  }
}