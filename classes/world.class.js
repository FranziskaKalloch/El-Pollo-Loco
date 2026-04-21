class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud(0), new Cloud(250), new Cloud(450)];
  backgroundObjects = [new Background('img/5_background/layers/1_first_layer/1.png')];

  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Clouds anzeigen lassen

    for (const cloud of this.clouds) {
      this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
    }

    // Background Image

    for (const background of this.backgroundObjects) {
      this.ctx.drawImage(background.img, background.x, background.y, background.width, background.height);
    }

    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height); // (bild, x, y, breite, höhe )

    // Schleife, um die chickens darzustellen:

    for (const enemy of this.enemies) {
      this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
    }

    // draw() wird immer wieder aufgerufen
    let start = this;
    requestAnimationFrame(function () {
      // die function wird ausgeführt, sobald alles dadrüber gezeichnet wurde
      start.draw();
    });
    // hier wird die Methode so häufig augerufen, wie es die Grafikkarte hergibt - 10 bis 60 pro sekunde, je nachdem.
  }

  addToMap(move) {
    this.ctx.drawImage(move.img, move.y, move.y, move.width, move.height);
  }
}
