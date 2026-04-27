class Background extends MoveableObject {
  constructor(imagePath, x, y) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = y; // 480-this.height // koordinate berechnen
    this.width = 720;
    this.height = 480;
  }
}
