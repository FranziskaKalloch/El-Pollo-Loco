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
        super(x,y); 
        this.imageCache = [];
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadToCache();
        this.width = 60;
        this.height = 60;
    }

}