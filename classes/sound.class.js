class Sounds {


    constructor(type) {
        this.coinSound = new Audio('audio/coin-fall.wav');
        this.jumpSound = new Audio('audio/cartoon-jump.mp3'); 
        this.bottleSound = new Audio('audio/bottle-pop.mp3');
        this.throwSound = new Audio('audio/whoosh.mp3'); 
        this.punchSound = new Audio('audio/punch.mp3');
        this.jumpOnEnemy = new Audio('audio/jumpOnEnemy.ogg');
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
    if(type === 'throw') {
        this.throwSound.play(); 
    }
     if(type === 'punch') {
        this.punchSound.play(); 
    }
     if(type === 'jumpOnEnemy') {
        this.jumpOnEnemy.play(); 
    }
 }

}