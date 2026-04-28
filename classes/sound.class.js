class Sounds {


    constructor(type) {
        this.coinSound = new Audio('audio/coins.wav');
        this.jumpSound = new Audio('audio/jump.wav'); 
    }

 play(type) {
    if(type === 'coin') {
        this.coinSound.play();
    } 
    if(type === 'jump') {
        this.jumpSound.play(); 
    }
 }


}