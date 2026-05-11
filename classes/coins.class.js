class Coins extends DrawableObject {
  constructor() {
    super();
    this.loadImage("img/8_coin/coin_2.png");
    this.x = 300 + Math.random() * 5000;
    this.y = 150 + Math.random() * 200;
    this.width = 100;
    this.height = 100;
  }

  offset = {
    top: 40,
    bottom: 40,
    left: 45,
    right: 45,
  };

  isCollected = false;
  startTime = 0;
}
