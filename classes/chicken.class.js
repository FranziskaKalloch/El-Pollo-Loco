class Chicken extends MoveableObject {
  img;

  imagesWalking = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];
  imagesDead = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
  imageCache = [];

  constructor(y) {
    super(); // super() ruft zuerst den Konstruktor der Elternklasse auf
    this.x = 300 + Math.random() * 2000; // Jedes Chicken bekommt eine zufällig Zahl zugewiesen // gibt eine Zahl zwischen 0 und 500
    this.y = 350;
    this.width = 100;
    this.height = 100;
    this.speed = 0.15 + Math.random() * 0.3;
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadToCache();
    this.animate();
  }

  currentImage = 0;
  isKilled = false;
  deathTime; 

  offset = {
    top: 25,
    bottom: 10,
    left: 35,
    right: 35, 
}

  loadToCache() {
    for (let i = 0; i < this.imagesWalking.length; i++) {
      let image = new Image();
      image.src = this.imagesWalking[i];
      this.imageCache.push(image);
    }
  }

  animate() {
    this.moveLeft();
    setInterval(() => {
      if(this.isKilled) {
      this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
      return;
    } // Walking Animation
      this.img = this.imageCache[this.currentImage];
      this.currentImage++;
      if (this.currentImage >= this.imageCache.length) {
        this.currentImage = 0;
      }
    }, 100);
  }
 
  moveLeft() {
    setInterval(() => {
      if(this.isKilled) {
        return; 
      }
      this.x -= this.speed;
    }, 1000 / 60);
  }

}
