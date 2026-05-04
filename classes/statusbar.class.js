class Statusbar extends DrawableObject {

imagesHealth = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
]; 
    
imagesCoins = [
     "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
];

imagesSalsaBottle = [
     "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
     "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
     "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
     "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
     "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
     "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
];

imagesEndboss = [
  'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
  'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
  'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
  'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
  'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
  'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
];


x = 10;
y = 0; 
width = 230;
height = 60; 
    

constructor(type) {
    super(); 
    this.type = type; 
    this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png')
    this.loadImages(this.imagesHealth); 
    this.loadImages(this.imagesCoins); 
    this.loadImages(this.imagesSalsaBottle);
    this.loadImages(this.imagesEndboss); 
  
    
  if (this.type === "health") {
    this.setBar(100);
  }
  if (this.type === "coins") {
   this.setBar(0); 
  }
  if(this.type === 'bottles') {
    this.setBar(0); 
  }
  if(this.type === 'boss') {
    this.setBar(100); 
   }
  
}

setBar(percentage) { // diese Funktion bekommt von Außen einen Wert (100,80,60..)
    this.percentage = percentage; 
    let path = this.rightImage();
    this.img = this.imageCache[path];
    }

rightImage() {
let index;
    if (this.percentage === 100) {
    index = 5;
     } else if (this.percentage === 80) {
    index = 4;
    } else if (this.percentage === 60) {
    index = 3;
    } else if (this.percentage === 40) {
    index = 2;
    } else if (this.percentage === 20) {
    index = 1;
    } else if (this.percentage === 0) {
    index = 0;
  }

  if (this.type === "health") {
    return this.imagesHealth[index];
  }
  if (this.type === "coins") {
    return this.imagesCoins[index];
  }
  if (this.type === "bottles") {
    return this.imagesSalsaBottle[index];
  }
  if (this.type === "boss") {
    return this.imagesEndboss[index]; 
  }
}
}
