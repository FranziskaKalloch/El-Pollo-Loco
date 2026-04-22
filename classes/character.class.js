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

  constructor(world) {
    super();
    this.world = world;
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadToCache();
    this.animate();
  }

  loadToCache() {
    for (let i = 0; i < this.imagesWalking.length; i++) {
      let image = new Image(); // hier ist jetzt ein leeres Bildobjekt
      image.src = this.imagesWalking[i]; // sagt welche Datei geladen werden soll
      this.imageCache.push(image);
    }
  }

  currentImage = 0;

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
