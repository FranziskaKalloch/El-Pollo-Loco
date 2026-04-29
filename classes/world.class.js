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
  bottles = [
    new SalsaBottle(),
  ]

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

  collectedCoins = 0; 
  maxCoins = 5; 
 
  constructor(canvas, keyboard) {
    this.coinBar.x = 20;
    this.coinBar.y = 55; 

    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character = new Character(this);
    this.sound = new Sounds(); 
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

   for (const coin of this.coins) {
    if (coin.isCollected) {
      this.drawRotatingCoin(coin);
    } else {
      this.addToMap(coin);
    }
  }

  for(const bottle of this.bottles) {
    this.addToMap(bottle); 
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

  drawRotatingCoin(coin) {
  let ctx = this.ctx;

  let animationTime = Date.now() - coin.startTime;
  let angle = animationTime * 0.02; // Geschwindigkeit der Drehung

  ctx.save();

  // Mittelpunkt berechnen
  let centerX = coin.x + coin.width / 2;
  let centerY = coin.y + coin.height / 2;

  // Zum Mittelpunkt verschieben
  ctx.translate(centerX, centerY);

  // Drehen
  ctx.rotate(angle);

  // Bild zeichnen (verschoben zurück)
  ctx.drawImage(
    coin.img,
    -coin.width / 2,
    -coin.height / 2,
    coin.width,
    coin.height
  );

  ctx.restore();
}


  // Game Loop/Überwachung: passiert gerade irgendwo im Spiel eine Kollision?
  // läuft dauerhaft (setInterval), geht durch alle Gegner,
  // .. fragt immer wieder: "Kollidiert Pepe gerade mit diesem Gegner?"
  // das ist der Wächter
 checkCollisions() {
  setInterval(() => {
    this.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isHurt()) {
        this.character.hit(); 
        this.healthBar.setBar(this.character.energy);
      }
    });
     this.collectCoins(); 
  }, 1000);
 }
 
 collectCoins() {
  for (let index = this.coins.length - 1; index >= 0; index--) {
    let coin = this.coins[index];
    if (this.character.isColliding(coin) && !coin.isCollected) {
      coin.isCollected = true;
      coin.startTime = Date.now();
      this.sound.play('coin');
      this.collectedCoins++;
      let percentage = (this.collectedCoins / this.maxCoins) * 100;
      this.coinBar.setBar(percentage);
    }
    if (coin.isCollected) {
      let finished = this.animateCoin(coin);
      if (finished) {
        this.coins.splice(index, 1);
      }
    }
  }
}

 animateCoin(coin) {
  let animationTime = Date.now() - coin.startTime; 
    if( animationTime < 1000) {
      coin.y -= 10;  //→ bewege ihn nach oben
      return false; 
  //→ rotiere ihn
    } 
    return true;  // Animation ist fertig, du darfst sie löschen
      // löschen
    }

  }

 

// Jeder Coin = 20
// also - maxCoin = 5; 
// 1 Coin = 20;
// 2 Coin = 40;
// 3 Coin = 60;
// 4 Coin = 80;
// 5 Coin = 100; 

// Prozentrechnung: 
// collected / max * 100 
