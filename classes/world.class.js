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
  camera_x = 0; // startwert
  statusBar = new Statusbar(); 


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character = new Character(this);
    this.draw();
    this.checkCollisions();
  }

 
  // Hilfsfunktion...
  // Das ist die Funktion mit der alle Objekte gezeichnet werden 
  addToMap(object) {
    this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // hier wollen wir den komplette Auschnitt des Canvas verschieben
    this.ctx.translate(this.camera_x, 0); // translate bedeutete, dass wir etwas verschieben wollen

    for (const background of this.backgroundObjects) {
      this.addToMap(background);
    }

    this.addToMap(this.statusBar);

    for (const cloud of this.clouds) {
      this.addToMap(cloud); 
    }

    if (this.character.otherDirection == false) {
      this.addToMap(this.character); 
    } else {
      this.ctx.save();
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(this.character.img, -this.character.x - this.character.width, this.character.y, this.character.width, this.character.height);
      this.ctx.restore();
    }

    for (const enemy of this.enemies) {
      this.addToMap(enemy); 
    }

    // Hier wird alles wieder rückgängig gemacht -> Zuerst
    this.ctx.translate(-this.camera_x, 0);

    // draw() wird immer wieder aufgerufen
    let start = this;
    requestAnimationFrame(function () {  // die function wird ausgeführt, sobald alles dadrüber gezeichnet wurde
      start.draw();
    });  // hier wird die Methode so häufig augerufen, wie es die Grafikkarte hergibt - 10 bis 60 pro sekunde, je nachdem.
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

}
