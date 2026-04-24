class World {
  //character = new Character();
  //level = level1

  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud(0), new Cloud(250), new Cloud(450)];

  backgroundObjects = [
    new Background('img/5_background/layers/air.png', 0, 0),
    new Background('img/5_background/layers/3_third_layer/1.png', 0, 0),
    new Background('img/5_background/layers/2_second_layer/1.png', 0, 0),
    new Background('img/5_background/layers/1_first_layer/1.png', 0, 0),
    new Background('img/5_background/layers/air.png', 720, 0),
    new Background('img/5_background/layers/3_third_layer/2.png', 720, 0),
    new Background('img/5_background/layers/2_second_layer/2.png', 720, 0),
    new Background('img/5_background/layers/1_first_layer/2.png', 720, 0),
    new Background('img/5_background/layers/air.png', 1440, 0),
    new Background('img/5_background/layers/3_third_layer/1.png', 1440, 0),
    new Background('img/5_background/layers/2_second_layer/1.png', 1440, 0),
    new Background('img/5_background/layers/1_first_layer/1.png', 1440, 0),
  ];

  canvas;
  ctx;
  keyboard;
  camera_x = 0; // wird 100px nach links verschoben / startwert
  statusBar = new Statusbar(); 

  

  constructor(canvas, keyboard, level1) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character = new Character(this);
    this.checkCollisions();

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

    // hier wollen wir den komplette Auschnitt des Canvas verschieben

    this.ctx.translate(this.camera_x, 0); // translate bedeutete, dass wir etwas verschieben wollen

    // Background Image

    for (const background of this.backgroundObjects) {
      this.ctx.drawImage(background.img, background.x, background.y, background.width, background.height);
    }

    // Statusbar zeichnen lassen 
    this.ctx.drawImage(this.statusBar.img, this.statusBar.x, this.statusBar.y, this.statusBar.width, this.statusBar.height)

    // Clouds anzeigen lassen

    for (const cloud of this.clouds) {
      this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
      // cloud.moveLeft();
    }

    // Character
    // das ist der Moment, wo das Bild gerendert wird
    if (this.character.otherDirection == false) {
      this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height); // (bild, x, y, breite, höhe ))
    } else {
      this.ctx.save();
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(this.character.img, -this.character.x - this.character.width, this.character.y, this.character.width, this.character.height);
      this.ctx.restore();
    }

    // Chickens

    for (const enemy of this.enemies) {
      this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
    }

    // Hier wird alles wieder rückgängig gemacht -> Zuerst

    this.ctx.translate(-this.camera_x, 0);

    // draw() wird immer wieder aufgerufen
    let start = this;
    requestAnimationFrame(function () {
      // die function wird ausgeführt, sobald alles dadrüber gezeichnet wurde
      start.draw();
    });
    // hier wird die Methode so häufig augerufen, wie es die Grafikkarte hergibt - 10 bis 60 pro sekunde, je nachdem.
  }

 checkCollisions() {

  setInterval(() => {
    console.log('Intervall läuft');
    this.enemies.forEach((enemy) => {
      console.log('Prüfe Gegner', enemy);
      if (this.character.isColliding(enemy)) {
        console.log('Kollidiert mit Character');
        this.character.energy -= 20;
        console.log(this.character.energy);
      }
    });
  }, 1000);

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
