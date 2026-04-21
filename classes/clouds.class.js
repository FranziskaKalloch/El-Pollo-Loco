class Cloud extends MoveAbleObject {
  constructor(x) {
    super();
    this.x = x; // soll an eienr zufälligen Position gestellt werden
    this.y = 50;
    this.width = 250;
    this.height = 200;
    this.loadImage('./img/5_background/layers/4_clouds/1.png');
  }
}
