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

  imagesHurt = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  imagesDead = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
  ];
  imagesIdle = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  imagesLongIdle = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ]


  constructor(world) {
    super();
    this.world = world;
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.imagesWalking); // Funktion hat einen Parameter, also kann ich auch nur ein Argument übergeben...
    this.loadImages(this.imagesJumping); // daher wird sie zweimal aufgerufen
    this.loadImages(this.imagesHurt); 
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
      if(this.isHurt()) {
        currentImages = this.imagesHurt; 
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

  checkCoolDown() {

  }
}

// Aufgaben:
// eine Endpunkt im Level festlegen
// levenEnd = 3000;