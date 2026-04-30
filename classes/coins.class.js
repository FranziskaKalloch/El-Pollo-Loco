class Coins extends DrawableObject {


    constructor() {
        super(); 
        this.loadImage('img/8_coin/coin_2.png');
        this.x = 300 + Math.random() * 2000;
        this.y = 150 + Math.random() * 200; 
        this.width = 100;
        this.height = 100; 
        
    } 

offset = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
}

isCollected = false;
startTime = 0;

}  