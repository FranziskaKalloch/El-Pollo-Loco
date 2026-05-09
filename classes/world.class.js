class World {
  statusBar = new Statusbar();
  healthBar = new Statusbar("health");
  coinBar = new Statusbar("coins");
  bottleBar = new Statusbar("bottles");
  endbossBar = new Statusbar("boss");

  coins = [
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
  ];

  gameStarted = false;
  throwableItems = []; // geworfene Bottles
  canvas;
  ctx;
  keyboard;
  camera_x = 0; // startwert
  collectedCoins = 0;
  maxCoins = 5;
  collectedBottles = 0;
  maxBottles = 5;
  canThrow = true;
  isKilled = false;
  gameOver = false;
  gameWon = false;

  constructor(canvas, keyboard) {
    this.level = level1;
    this.enemies = this.level.enemies;
    this.bottles = this.level.bottles;
    this.clouds = this.level.clouds;
    this.backgroundObjects = this.level.backgroundObjects;
    this.levelEndX = this.level.levelEndX;

    this.coinBar.x = 10;
    this.coinBar.y = 50;

    this.bottleBar.x = 10;
    this.bottleBar.y = 100;

    this.endbossBar.x = 480;
    this.endbossBar.y = 5;

    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character = new Character(this); // Erstelle einen Character & gebe ihm diese world mit
    this.endboss = new Endboss(this); // Erstelle einen Endboss & gib ihm DIESE World mit - somit kann der Endboss auf die ganze world zugreifen
    this.sound = sound;
    this.gameLoop();
  }

  // Hilfsfunktion...
  // Das ist die Funktion mit der alle Objekte gezeichnet werden
  addToMap(object) {
    if (!object.img) {
      return;
    }
    this.ctx.drawImage(
      object.img,
      object.x,
      object.y,
      object.width,
      object.height,
    );
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

    for (const bottle of this.bottles) {
      this.addToMap(bottle);
    }

    for (const item of this.throwableItems) {
      this.addToMap(item);
    }
    if (this.character.otherDirection == false) {
      this.addToMap(this.character);
    } else {
      this.ctx.save();
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.character.img,
        -this.character.x - this.character.width,
        this.character.y,
        this.character.width,
        this.character.height,
      );
      this.ctx.restore();
    }

    for (const enemy of this.enemies) {
      this.addToMap(enemy);
    }

    this.addToMap(this.endboss);
    // Hier wird alles wieder rückgängig gemacht -> Zuerst
    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.healthBar); // Zeichnen ohne Kamera. Die Statusbar bleibt fest oben links und bewegt sich nicht mit
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);

    if (this.character.x > 3300) {
      this.addToMap(this.endbossBar);
    }
  }

  drawRotatingCoin(coin) {
    let ctx = this.ctx;
    let animationTime = Date.now() - coin.startTime;
    let angle = animationTime * 0.01; // Geschwindigkeit der Drehung
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
      coin.height,
    );
    ctx.restore();
  }

  gameLoop() {
    if (this.gameOver && this.gameWon) {
      return;
    }
    if (!gamePaused) {
      this.update();
    }
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.updateEnemies();
    this.checkCollisions();
    this.checkThrowableObject();
    this.checkBottleCollision();
    this.checkEndbossBottleCollision();
    this.removeDeadEnemies();
    this.removeBottles();
    this.checkGameState();
  }

  updateEnemies() {
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
  }

  // Game Loop/Überwachung: passiert gerade irgendwo im Spiel eine Kollision?
  // läuft dauerhaft (setInterval), geht durch alle Gegner,
  // .. fragt immer wieder: "Kollidiert Pepe gerade mit diesem Gegner?"
  // das ist der Wächter
  checkCollisions() {
    if (this.gameOver || this.gameWon) {
      return;
    }
    this.checkJumpOnEnemy();
    this.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        !this.character.isHurt() &&
        !enemy.isKilled
      ) {
        this.character.hit();
        this.healthBar.setBar(this.character.energy);
        this.sound.play("hurt");
      }
    });
    this.collectCoins();
    this.collectBottles();
    this.checkEndbossAttack();
  }

  checkBottleCollision() {
    this.throwableItems.forEach((item) => {
      this.enemies.forEach((enemy) => {
        if (item.isColliding(enemy) && !item.hasHitGround && !enemy.isKilled) {
          this.killEnemy(enemy);
          this.bottleSplash(item);
          this.sound.play("punch");
        }
      });
    });
  }

  killEnemy(enemy) {
    enemy.isKilled = true;
    enemy.speed = 0;
    enemy.deathTime = Date.now();
  }

  checkJumpOnEnemy() {
    this.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        !enemy.isKilled &&
        this.character.speedY > 0 &&
        this.character.y + this.character.height < enemy.y + enemy.height
      ) {
        this.killEnemy(enemy);
        this.character.speedY = -15;
        this.sound.play("jumpOnEnemy");
      }
    });
  }

  removeDeadEnemies() {
    for (let index = this.enemies.length - 1; index >= 0; index--) {
      let enemy = this.enemies[index];
      if (enemy.isKilled && Date.now() - enemy.deathTime > 3000) {
        this.enemies.splice(index, 1);
      }
    }
  }

  checkEndbossBottleCollision() {
    this.throwableItems.forEach((item) => {
      if (item.isColliding(this.endboss) && !item.hasHitGround) {
        this.bottleSplash(item);
        this.endboss.state = "hurt";
        this.endboss.hit();
        this.endbossBar.setBar(this.endboss.energy);

        if (this.endboss.isDead()) {
          this.endboss.state = "dead";
          this.sound.play("bossDeath");
        } else {
          this.sound.play("punch");
        }
      }
    });
  }

  bottleSplash(item) {
    item.hasHitGround = true;
    item.speedX = 0;
    item.speedY = 0;
    item.acceleration = 0;
    item.splashStartTime = Date.now();
    item.loadImage(item.imagesBottleSplash[0]);
    item.animateSplash();
  }
  // noch prüfen, ob Pepe von oben kommt
  // this.character.y + this.character.height < enemy.y + enemy.height / 2

  checkEndbossAttack() {
    if (this.gameOver || this.gameWon) {
      return;
    }
    if (
      this.endboss.state === "attack" &&
      this.character.isColliding(this.endboss) &&
      !this.character.isHurt()
    ) {
      this.character.hit();
      this.healthBar.setBar(this.character.energy);
      this.sound.play("hurt");
    }
  }

  checkThrowableObject() {
    if (this.keyboard.D && this.collectedBottles > 0 && this.canThrow == true) {
      this.throwBottle();
    }

    if (!this.keyboard.D) {
      this.canThrow = true;
    }
  }

  throwBottle() {
    let direction;
    this.sound.play("throw");
    let bottle = new SalsaBottle();
    bottle.loadImage(bottle.imagesBottleRotation[0]);
    this.canThrow = false;
    this.throwableItems.push(bottle);
    if (this.character.otherDirection) {
      direction = -5;
    } else {
      direction = 5;
    }
    bottle.throw(this.character.x + 100, this.character.y + 60, direction);
    this.updateBottleBar();
  }

  updateBottleBar() {
    this.collectedBottles--;
    let percentage = (this.collectedBottles / this.maxBottles) * 100;
    percentage = Math.min(100, Math.round(percentage / 20) * 20);
    this.bottleBar.setBar(percentage);
  }

  // Date.now() = akutelle Zeit
  // deathTime() = Zeitpunkt des Todes
  // Differenz berechnen:
  // Date.now() - deathTime > 1000 = Wie lange ist er schon Tod?
  removeBottles() {
    for (let index = this.throwableItems.length - 1; index >= 0; index--) {
      let bottle = this.throwableItems[index];
      if (bottle.hasHitGround && Date.now() - bottle.splashStartTime > 4000) {
        this.throwableItems.splice(index, 1);
      }
    }
  }

  collectCoins() {
    for (let index = this.coins.length - 1; index >= 0; index--) {
      let coin = this.coins[index];
      if (this.character.isColliding(coin) && !coin.isCollected) {
        coin.isCollected = true;
        coin.startTime = Date.now();
        this.sound.play("coin");
        this.collectedCoins++;
        let percentage = (this.collectedCoins / this.maxCoins) * 100;
        percentage = Math.min(100, Math.round(percentage / 20) * 20);
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

  collectBottles() {
    for (let index = this.bottles.length - 1; index >= 0; index--) {
      let bottle = this.bottles[index];
      if (
        this.character.isColliding(bottle) &&
        this.collectedBottles < this.maxBottles
      ) {
        this.collectedBottles++;
        this.sound.play("bottles");
        let percentage = (this.collectedBottles / this.maxBottles) * 100;
        percentage = Math.min(100, Math.round(percentage / 20) * 20);
        this.bottleBar.setBar(percentage);
        this.bottles.splice(index, 1);
      }
    }
  }

  animateCoin(coin) {
    let animationTime = Date.now() - coin.startTime;
    if (animationTime < 1000) {
      coin.y -= 10; //→ bewege ihn nach oben
      return false;
    }
    return true; // Animation ist fertig, du darfst sie löschen
    // löschen
  }

  checkGameState() {
    if (this.character.isDead() && !this.gameOver) {
      this.gameOver = true;
      this.sound.play("gameOver");
      gameOverScreen.classList.remove("hidden");
      game.classList.add("hidden");
      this.sound.stopBackgroundMusic();
    }
    if (this.endboss.deadAnimationFinished && !this.gameWon) {
      this.gameWon = true;
      this.sound.play("won");
      winScreen.classList.remove("hidden");
      game.classList.add("hidden");
      this.sound.stopBackgroundMusic();
    }
  }
}
