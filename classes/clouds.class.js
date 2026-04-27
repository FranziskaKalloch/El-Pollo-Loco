class Cloud extends MoveableObject {
  constructor(x) {
    super();
    this.x = x;
    this.y = 50;
    this.width = 250;
    this.height = 200;
    this.loadImage('./img/5_background/layers/4_clouds/1.png');
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= 0.15; // 60x pro Sekunde wird dieser Pixelwert abgezogen
    }, 1000 / 60); // Jede Sekunde bewegen die Wolken sich
  }
}

// Meine Variante

//  moveLeft(x) {
//    this.x -= 0.2;
//    if (this.x + this.width < 0) {
//     this.x = x;
//    }
//  }
