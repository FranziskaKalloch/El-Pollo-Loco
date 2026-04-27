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

x = 20;
y = 10; 
width = 250;
height = 70; 
    

constructor(type) {
    super(); 
    this.type = type; 
    this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png')
    this.loadImages(this.imagesHealth); 
    this.loadImages(this.imagesCoins); 
    

  if (this.type === "health") {
    this.setBar(100);
  }
  if (this.type === "coins") {
   this.setBar(0); 
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
}
}
