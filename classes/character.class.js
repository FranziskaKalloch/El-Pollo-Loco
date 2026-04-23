class Character extends MoveAbleObject {
  img;
  imageCache = [];
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
  y = 20;
  speedY = 0;
  acceleration = 2;
  currentImage = 0;

  constructor(world) {
    super();
    this.world = world;
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadToCache();
    this.animate();
    this.gravity();
  }

  loadToCache() {
    for (let i = 0; i < this.imagesWalking.length; i++) {
      let image = new Image(); // hier ist jetzt ein leeres Bildobjekt
      image.src = this.imagesWalking[i]; // sagt welche Datei geladen werden soll
      this.imageCache.push(image);
    }
  }

  animate() {
    setInterval(() => {
      // move forward & backward
      this.move();
      // Walk Animation
      this.img = this.imageCache[this.currentImage]; // es darf nur bis 6 gehen, daher this.imageCache.length
      this.currentImage++;
      if (this.currentImage >= this.imageCache.length) {
        this.currentImage = 0;
      }
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

  jump() {}

  gravity() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.y = this.y + this.speedY; // Pepe bewegt sich nach unten / y = wo ist Pepe gerade / speedY = wie große Schritte macht er
        this.speedY = this.speedY + this.acceleration; //
      } else {
        this.y = 150;
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 150; // Pepe ist in der Luft, wenn seine y-Position kleiner als 150 ist -- 150 = Bodenhöhe - und alles dadrüber ist unter dem Boden
  } // gibt ein true zurück // Ja Pepe ist in der Luft

  throw() {}
}

// Aufgaben:
// eine Endpunkt im Level festlegen
// levenEnd = 3000;

// IMAGES_WALKING = [
// W-21
// W-22
// W-23
// ...
// ]

// this.loadImage(this.IMAGES_WALKING)
// let currentImage = 0;

// this animate();  // in den constructor

//  animate() {
//     setInterval(() => {
//       let i = this.currentImage % this.imagesWalking.length;  // Modulo ist der mathematische Rest // let i = 0 % 6 //
//       let path = this.imagesWalking[i];
//       this.img = this.imageCache[path];
//       this.currentImage++
//    }, 100);
//  }
