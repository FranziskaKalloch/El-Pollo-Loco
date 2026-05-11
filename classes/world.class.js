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

  /**
   * Creates a new game world and initializes all level objects,
   * status bars, enemies, sounds and the main game loop.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering.
   * @param {Keyboard} keyboard - The keyboard input controller.
   */
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

  /**
   * Draws a game object onto the canvas.
   * Skips rendering if the object has no image assigned.
   *
   * @param {DrawableObject} object - The object to draw.
   */
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

  /**
   * Draws all game objects and user interface elements onto the canvas.
   * Handles camera movement, status bars, character rendering and enemies.
   */
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

    // Hier wird alles wieder rückgängig gemacht -> Zuerst
    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.healthBar); // Zeichnen ohne Kamera. Die Statusbar bleibt fest oben links und bewegt sich nicht mit
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);

    if (this.character.x > 3800) {
      this.addToMap(this.endbossBar);
    }

    this.ctx.translate(this.camera_x, 0);

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

    this.addToMap(this.endboss);

    for (const enemy of this.enemies) {
      this.addToMap(enemy);
    }

    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws a rotating coin animation after a coin has been collected.
   *
   * @param {Coins} coin - The collected coin object.
   */
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

  /**
   * Starts the main game loop.
   * Continuously updates and redraws the game using requestAnimationFrame.
   */
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

  /**
   * Updates all game mechanics and collision checks.
   * Handles enemies, throwable objects, bottle collisions and game state updates.
   */
  update() {
    this.updateEnemies();
    this.checkCollisions();
    this.checkThrowableObject();
    this.checkBottleCollision();
    this.checkEndbossBottleCollision();
    this.checkBottleGroundCollision();
    this.removeDeadEnemies();
    this.removeBottles();
    this.checkGameState();
  }

  /**
   * Updates all enemies in the current level.
   * Calls the update method of each enemy object.
   */
  updateEnemies() {
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
  }

  /**
   * Checks all character collisions in the game.
   * Handles enemy hits, coin collection, bottle collection and endboss attacks.
   */
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

  /**
   * Checks whether thrown bottles collide with enemies.
   * Kills enemies and triggers the bottle splash animation on impact.
   */
  checkBottleCollision() {
    this.throwableItems.forEach((item) => {
      console.log("Bottle check", item.x, item.y, item.hasHitGround);
      if (item.hasHitGround) {
        return;
      }
      this.enemies.forEach((enemy) => {
        if (enemy.isKilled) {
          return;
        }
        if (item.isColliding(enemy)) {
          this.killEnemy(enemy);
          this.bottleSplash(item);
          this.sound.play("punch");
        }
      });
    });
  }

  /**
   * Marks an enemy as killed and stores the death timestamp.
   *
   * @param {MoveableObject} enemy - The enemy that should be defeated.
   */
  killEnemy(enemy) {
    enemy.isKilled = true;
    enemy.speed = 0;
    enemy.deathTime = Date.now();
  }

  /**
   * Checks whether the character jumps on top of an enemy.
   * Defeats the enemy and bounces the character upward after collision.
   */
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

  /**
   * Removes defeated enemies from the game after a delay.
   */
  removeDeadEnemies() {
    for (let index = this.enemies.length - 1; index >= 0; index--) {
      let enemy = this.enemies[index];
      if (enemy.isKilled && Date.now() - enemy.deathTime > 3000) {
        this.enemies.splice(index, 1);
      }
    }
  }

  /**
   * Checks whether thrown bottles collide with the endboss.
   * Damages the endboss, updates the boss health bar and handles boss death.
   */
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

  /**
   * Starts the splash animation for a thrown bottle.
   * Stops bottle movement and stores the splash start time.
   *
   * @param {SalsaBottle} item - The thrown bottle that should splash.
   */
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

  /**
   * Checks whether the endboss hits the character during an attack.
   * Damages the character and updates the health bar.
   */
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

  /**
   * Checks whether the throw key is pressed.
   * Throws a bottle if the character has bottles available.
   */
  checkThrowableObject() {
    if (this.keyboard.D && this.collectedBottles > 0 && this.canThrow == true) {
      this.throwBottle();
    }

    if (!this.keyboard.D) {
      this.canThrow = true;
    }
  }

  /**
   * Creates and throws a new salsa bottle.
   * Sets the throw direction based on the character direction.
   */
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

  /**
   * Updates the bottle bar after throwing a bottle.
   * Reduces the collected bottle amount and recalculates the bar percentage.
   */
  updateBottleBar() {
    this.collectedBottles--;
    let percentage = (this.collectedBottles / this.maxBottles) * 100;
    percentage = Math.min(100, Math.round(percentage / 20) * 20);
    this.bottleBar.setBar(percentage);
  }

  /**
   * Removes thrown bottles after their splash animation has finished.
   */
  removeBottles() {
    for (let index = this.throwableItems.length - 1; index >= 0; index--) {
      let bottle = this.throwableItems[index];
      if (bottle.hasHitGround && Date.now() - bottle.splashStartTime > 4000) {
        this.throwableItems.splice(index, 1);
      }
    }
  }

  /**
   * Checks whether thrown bottles hit the ground.
   * Starts the splash animation when a bottle reaches the ground.
   */
  checkBottleGroundCollision() {
    this.throwableItems.forEach((bottle) => {
      if (bottle.y + bottle.height > 450 && !bottle.hasHitGround) {
        this.bottleSplash(bottle);
      }
    });
  }

  /**
   * Handles coin collection.
   * Updates the coin bar and removes collected coins after their animation.
   */
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

  /**
   * Handles bottle collection.
   * Updates the bottle bar and removes collected bottles from the level.
   */
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

  /**
   * Animates a collected coin by moving it upward.
   *
   * @param {Coins} coin - The collected coin to animate.
   * @returns {boolean} Whether the coin animation is finished.
   */
  animateCoin(coin) {
    let animationTime = Date.now() - coin.startTime;
    if (animationTime < 1000) {
      coin.y -= 10; //→ bewege ihn nach oben
      return false;
    }
    return true; // Animation ist fertig, du darfst sie löschen
    // löschen
  }

  /**
   * Checks whether the game is over or won.
   * Shows the correct end screen and stops the background music.
   */
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
