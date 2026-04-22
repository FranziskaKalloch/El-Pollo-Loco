class World {
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud(0), new Cloud(250), new Cloud(450)];

  // Aufgabe:
  // background layers in der richtigen reihenfolge einfügeb
  backgroundObjects = [
    new Background('img/5_background/layers/air.png', 0, 0),
    new Background('img/5_background/layers/3_third_layer/1.png', 0, 0),
    new Background('img/5_background/layers/2_second_layer/1.png', 0, 0),
    new Background('img/5_background/layers/1_first_layer/1.png', 0, 0),
  ];

  canvas;
  ctx;
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character = new Character(this);

    this.draw();
  }

  // Bilder in der richtigen Reihenfolge erstellen
  // wie die draw() Methode funktioniert
  // ...
  // ... Hintergrundobjekt als erstes HInzufügen, weil es ganz hinten liegen soll!
  // 1. Clouds
  // 2. Background
  //3. Character
  //4. Chickens

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Background Image

    for (const background of this.backgroundObjects) {
      this.ctx.drawImage(background.img, background.x, background.y, background.width, background.height);
    }

    // Clouds anzeigen lassen

    for (const cloud of this.clouds) {
      this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
      // cloud.moveLeft();
    }

    // Character

    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height); // (bild, x, y, breite, höhe )

    // Chickens

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
    this.ctx.drawImage(move.img, move.x, move.y, move.width, move.height);
    // hier kommt dann alles rein, damit nicht:
    // Also statt:
    // * Clouds einzeln
    // * Chickens einzeln
    // * Character einzeln
    // alles hier bündeln
  }
}
