class World {
  character = new Character();
  enemies = [new Chicken(200, 150, 100, 100), new Chicken(400, 150, 100, 100), new Chicken(600, 150, 100, 100)];

  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

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
}
