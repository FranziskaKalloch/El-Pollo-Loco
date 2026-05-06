class Sounds {
  constructor(type) {
    this.backgroundMusic = new Audio("audio/mexico-music.mp3");
    this.backgroundMusic.loop = true;

    this.coinSound = new Audio("audio/coin-fall.wav");
    this.jumpSound = new Audio("audio/cartoon-jump.mp3");
    this.bottleSound = new Audio("audio/bottle-pop.mp3");
    this.throwSound = new Audio("audio/whoosh.mp3");
    this.punchSound = new Audio("audio/punch.mp3");
    this.jumpOnEnemy = new Audio("audio/jumpOnEnemy.ogg");
    this.bottleBrokenSound = new Audio("audio/broken-bottle2.mp3");
    this.bossDeath = new Audio("audio/boss-dead.mp3");
    this.hurtSound = new Audio("audio/hurt-pepe.wav");
    this.wonSound = new Audio("audio/you-won.mp3");
    this.gameOverSound = new Audio("audio/game-over.wav");

    this.windSound = new Audio("audio/wind.mp3");

    this.clickSound = new Audio("audio/click-sound.mp3");
    this.startScreenSound = new Audio("audio/intro-music.mp3");

    this.backgroundMusic.volume = 0.5;
    this.coinSound.volume = 1.0;
  }

  musicMuted = false;
  soundMuted = false;
  musicVolume = 0.5;

  play(type) {
    if (this.soundMuted) {
      return;
    }
    if (type === "coin") {
      this.coinSound.play();
    }
    if (type === "jump") {
      this.jumpSound.play();
    }
    if (type === "bottles") {
      this.bottleSound.play();
    }
    if (type === "throw") {
      this.throwSound.play();
    }
    if (type === "punch") {
      this.punchSound.play();
    }
    if (type === "jumpOnEnemy") {
      this.jumpOnEnemy.play();
    }
    if (type === "hurt") {
      this.hurtSound.play();
    }
    if (type === "bossDeath") {
      this.bossDeath.play();
    }
    if (type === "won") {
      this.wonSound.play();
    }
    if (type === "gameOver") {
      this.gameOverSound.play();
    }
    if (type === "click") {
      this.clickSound.play();
    }
    if (type === "startScreen") {
      this.startScreenSound.play();
    }
    if (type === "wind") {
      this.windSound.play();
    }
  }

  setSoundMuted() {
    this.soundMuted = isMuted;
  }

  setMusicMuted(isMuted) {
    this.musicMuted = isMuted;

    this.backgroundMusic.muted = isMuted;
    this.startScreenSound.muted = isMuted;
  }

  setMusicVolume() {
    this.musicVolume = volume;
    this.backgroundMusic.volume = volume;
    this.startScreenSound.volume = volume;
  }

  playStartScreenMusic() {
    this.startScreenSound.loop = true;
    this.startScreenSound.volume = 0.5;
    this.startScreenSound.play();
  }

  stopStartScreenMusic() {
    this.startScreenSound.pause();
    this.startScreenSound.currentTime = 0;
  }

  playBackgroundMusic() {
    this.backgroundMusic.play();
  }

  stopBackgroundMusic() {
    this.backgroundMusic.pause(); // Musik anhalten // sie stoppt sofort und merkt sich die aktuelle stelle
    this.backgroundMusic.currentTime = 0; // setzt die Musik wieder auf den Anfang
  }
}
