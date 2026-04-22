class Chicken extends MoveAbleObject {
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
    this.x = 200 + Math.random() * 500; // Jedes Chicken bekommt eine zufällig Zahl zugewiesen // gibt eine Zahl zwischen 0 und 500
    this.y = 350;
    this.width = 100;
    this.height = 100;
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadToCache();
    this.animate();
  }

  currentImage = 0;

  loadToCache() {
    for (let i = 0; i < this.imagesWalking.length; i++) {
      let image = new Image();
      image.src = this.imagesWalking[i];
      this.imageCache.push(image);
    }
  }

  animate() {
    setInterval(() => {
      this.img = this.imageCache[this.currentImage];
      this.currentImage++;
      if (this.currentImage >= this.imageCache.length) {
        this.currentImage = 0;
      }
    }, 100);
  }
}
