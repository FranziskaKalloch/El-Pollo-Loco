class Sounds {


    constructor(type) {
        this.coinSound = new Audio('audio/coin-fall.wav');
        this.jumpSound = new Audio('audio/jump.wav'); 
        this.bottleSound = new Audio('audio/glass-bottle-fall.wav');
        this.coinSound.volume = 1.0;  
        this.jumpSound.volume = 0.5; 
    }

 play(type) {
    if(type === 'coin') {
        this.coinSound.play();
    } 
    if(type === 'jump') {
        this.jumpSound.play(); 
    }
    if(type === 'bottles') {
        this.bottleSound.play(); 
    }
 }

}