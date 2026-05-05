class SmallChicken extends Chicken {

imagesWalking = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
]

imagesDead = [
    "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
]

    constructor(x,y) {
        console.log('SmallChicken x:', x);
        super(x,y); 
        this.x = x;
        this.imageCache = [];
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadToCache();
        this.width = 80;
        this.height = 80;
        this.y = 370; 
        this.speed = 0.3 + Math.random() * 0.5;
    }
}