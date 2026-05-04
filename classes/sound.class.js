class Sounds {


    constructor(type) {
        this.coinSound = new Audio('audio/coin-fall.wav');
        this.jumpSound = new Audio('audio/cartoon-jump.mp3'); 
        this.bottleSound = new Audio('audio/bottle-pop.mp3');
        this.throwSound = new Audio('audio/whoosh.mp3'); 
        this.punchSound = new Audio('audio/punch.mp3');
        this.jumpOnEnemy = new Audio('audio/jumpOnEnemy.ogg');
        this.bottleBrokenSound = new Audio('audio/broken-bottle2.mp3');
        this.bossDeath = new Audio('audio/boss-dead.mp3'); 
        this.hurtSound = new Audio('audio/hurt-pepe.wav');
        this.wonSound = new Audio('audio/you-won.mp3');
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
    if(type === 'hurt') {
        this.hurtSound.play(); 
    }
    if(type === 'bossDeath') {
        this.bossDeath.play();
    }
    if(type === 'won') {
        this.wonSound.play();
    }

 }

}