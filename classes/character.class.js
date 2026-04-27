class Character extends MoveableObject {
 
  imagesWalking = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];
  imagesJumping = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  imagesHurt = [];
  imagesDead = [];
  imagesIdle = [];


  constructor(world) {
    super();
    this.world = world;
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.imagesWalking); // Funktion hat einen Parameter, also kann ich auch nur ein Argument übergeben...
    this.loadImages(this.imagesJumping); // daher wird sie zweimal aufgerufen
    this.animate();
    this.gravity();
    this.jump();
  }

 

  // verallgemeinern und dann nur eine if Abfrage mit den jeweiligen Images reinpacken
  animate() {
    setInterval(() => { 
      this.move(); // move forward & backward
      let currentImages;
      if (this.isAboveGround()) {
        currentImages = this.imagesJumping;
      } else {
        currentImages = this.imagesWalking;
      }
      // Walk Animation
      let imageIndex = this.currentImage % currentImages.length;
      let path = currentImages[imageIndex];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);
  }

  move() {
    if (this.world.keyboard.RIGHT) {
      this.x += 10;
      this.otherDirection = false; // Bild nicht gespiegelt / schaut nach rechts
      this.world.camera_x = -this.x + 100; // Kamera wird verschoben - gegenteilig zum Laufen
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.x -= 10;
      this.otherDirection = true; // Bild ist gespiegelt / schaut nach links
      // das spiegeln an sich, passiert in draw()
      this.world.camera_x = -this.x + 100;
    }
    if (this.world.camera_x > 0) {
      this.world.camera_x = 0;
    }
  }

  jump() {
    setInterval(() => {
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        // wenn wir die Space Taste drücken und Pepe nicht auf dem Boden ist
        this.speedY = -30; // nach oben // starte den Sprung: negative Geschwindigkeit = Bewegung nach oben
        this.currentImage = 0;
        console.log('Ich springe');
      }
    }, 1000 / 25);
  }

  
  throw() {}
}

// Aufgaben:
// eine Endpunkt im Level festlegen
// levenEnd = 3000;