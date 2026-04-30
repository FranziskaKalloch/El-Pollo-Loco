class SalsaBottle extends ThrowableObject{

imagesBottleRotation = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
]

imagesBottleSplash = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
]

imagesBottleOnGround = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
]


    constructor() {
        super(); 
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
        this.loadImages(this.imagesBottleOnGround); 
        this.y = 350;
        this.x = 200 + Math.random() * 2000;
        this.width = 80;
        this.height = 100; 
    }
     // * Wenn x und y übergeben werden → geworfene Bottle startet dort
   // * Wenn nichts übergeben wird → Boden-Bottle bekommt Zufallsposition

offset = {
  top: 20,
  bottom: 20,
  left: 25,
  right: 25,
}



rotateBottle() {
    let currentImage = 0; 
    setInterval(() => {
        if (this.hasHitGround) {
            return;
        }
        currentImage++;
        let index = currentImage % this.imagesBottleRotation.length; 
        this.loadImage(this.imagesBottleRotation[index]); 
    },1000/10);   
}

animateSplash() {
    let currentImage = 0; 
    let interval = setInterval(() => {
        let index = this.imagesBottleSplash[currentImage];
         currentImage++;
         this.loadImage(index);
        if(currentImage >= this.imagesBottleSplash.length) {
            clearInterval(interval); 
        }
    }, 1000/10);
}
}