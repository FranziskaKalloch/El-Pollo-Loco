class World {
  //character = new Character();
  //level = level1
   statusBar = new Statusbar(); 
  healthBar = new Statusbar("health");
  coinBar = new Statusbar("coins");
  bottleBar = new Statusbar("bottles");
  endbossBar = new Statusbar("bossHealth"); 

  coins = [
    new Coins(), 
    new Coins(), 
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
  ]; 

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
 
  constructor(canvas, keyboard) {
    this.coinBar.x = 20;
    this.coinBar.y = 55; 

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

    for (const cloud of this.clouds) {
      this.addToMap(cloud); 
    }

     for(const coin of this.coins) {
      this.addToMap(coin); 
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
    

     this.addToMap(this.healthBar); // Zeichnen ohne Kamera. Die Statusbar bleibt fest oben links und bewegt sich nicht mit
     this.addToMap(this.coinBar);

    // draw() wird immer wieder aufgerufen
    let start = this;
    requestAnimationFrame(function () {  // die function wird ausgeführt, sobald alles dadrüber gezeichnet wurde
      start.draw();
    });  // hier wird die Methode so häufig augerufen, wie es die Grafikkarte hergibt - 10 bis 60 pro sekunde, je nachdem.
  }


  // Game Loop/Überwachung: passiert gerade irgendwo im Spiel eine Kollision?
  // läuft dauerhaft (setInterval), geht durch alle Gegner,
  // .. fragt immer wieder: "Kollidiert Pepe gerade mit diesem Gegner?"
  // das ist der Wächter
 checkCollisions() {
  setInterval(() => {
    console.log('check Kollision läuft');
    this.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isHurt()) {
        this.character.hit(); 
        this.healthBar.setBar(this.character.energy);
        console.log(this.character.energy);
      }
    });
  }, 1000);
}

}
