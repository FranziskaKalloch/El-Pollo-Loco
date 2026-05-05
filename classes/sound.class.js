class Sounds {


    constructor(type) {
        this.backgroundMusic = new Audio('audio/mexico-music.mp3');
        this.backgroundMusic.loop = true; 
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
        this.gameOverSound = new Audio('audio/game-over.wav');

        this.backgroundMusic.volume = 0.5;
        this.coinSound.volume = 1.0;  
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
    if(type === 'gameOver') {
        this.gameOverSound.play();
    }
 }

 playBackgroundMusic() {
    this.backgroundMusic.play(); 
 }

stopBackgroundMusic() {
  this.backgroundMusic.pause();
  this.backgroundMusic.currentTime = 0;

}

}